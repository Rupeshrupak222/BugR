import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);
  private readonly inMemoryLeads = new Map<string, any>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  private hasDatabase(): boolean {
    return Boolean(this.config.get<string>('DATABASE_URL'));
  }

  getPublicConfig() {
    const siteKey = this.config.get<string>('TURNSTILE_SITE_KEY');
    const enabled = Boolean(
      this.config.get<string>('DATABASE_URL') ||
      (this.config.get<string>('SUPABASE_URL') && this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY'))
    );
    return {
      enabled,
      siteKey: siteKey || null,
    };
  }

  async createLead(dto: CreateLeadDto, clientIp: string) {
    // 1. Honeypot check
    if (dto.website && dto.website.trim().length > 0) {
      this.logger.warn(`Spam bot detected via honeypot from IP: ${clientIp}`);
      throw new BadRequestException({ saved: false, message: 'Invalid submission' });
    }

    // 2. IP Rate limiting
    const ipHash = createHash('sha256')
      .update(clientIp.replace(/^::ffff:/, ''))
      .digest('hex');

    await this.enforceRateLimit(ipHash);

    // 3. Optional Turnstile verification
    const turnstileSecret = this.config.get<string>('TURNSTILE_SECRET_KEY');
    const expectedHostname = this.config.get<string>('TURNSTILE_HOSTNAME');

    if (turnstileSecret && dto.token) {
      await this.verifyTurnstile(dto.token, turnstileSecret, expectedHostname);
    }

    // 4. Save to PostgreSQL via Prisma
    if (this.hasDatabase()) {
      try {
        const existing = await this.prisma.lead.findUnique({
          where: { requestId: dto.requestId },
        });

        if (existing) {
          return {
            saved: true,
            id: existing.id,
            message: 'Lead already acknowledged (idempotent)',
          };
        }

        const lead = await this.prisma.lead.create({
          data: {
            requestId: dto.requestId,
            name: dto.name.trim(),
            email: dto.email.trim().toLowerCase(),
            phone: dto.phone.trim(),
            source: dto.source.trim(),
            message: (dto.message || '').trim(),
            status: 'NEW',
          },
        });

        this.logger.log(`New lead received for "${lead.source}" from ${lead.email}`);
        return { saved: true, id: lead.id, message: 'Enquiry submitted successfully' };
      } catch (error) {
        this.logger.warn(`Prisma lead store failed, using in-memory store: ${(error as Error).message}`);
      }
    }

    // Fallback store
    const existingMem = Array.from(this.inMemoryLeads.values()).find(
      (l) => l.requestId === dto.requestId,
    );
    if (existingMem) {
      return {
        saved: true,
        id: existingMem.id,
        message: 'Lead already acknowledged (idempotent)',
      };
    }

    const fallbackId = randomUUID();
    const memLead = {
      id: fallbackId,
      requestId: dto.requestId,
      name: dto.name.trim(),
      email: dto.email.trim().toLowerCase(),
      phone: dto.phone.trim(),
      source: dto.source.trim(),
      message: (dto.message || '').trim(),
      status: 'NEW',
      submittedAt: new Date().toISOString(),
    };
    this.inMemoryLeads.set(fallbackId, memLead);

    this.logger.log(`New lead received (in-memory mode) for "${memLead.source}" from ${memLead.email}`);
    return { saved: true, id: fallbackId, message: 'Enquiry submitted successfully' };
  }

  private async enforceRateLimit(ipHash: string): Promise<void> {
    if (!this.hasDatabase()) return;

    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentAttempts = await this.prisma.leadRateAttempt.count({
        where: {
          ipHash,
          attemptedAt: { gte: oneHourAgo },
        },
      });

      if (recentAttempts >= 10) {
        throw new HttpException(
          { saved: false, message: 'Rate limit exceeded. Please try again later.' },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      await this.prisma.leadRateAttempt.create({
        data: { ipHash },
      });
    } catch (err) {
      if (err instanceof HttpException) throw err;
      this.logger.warn(`Rate limit check skipped due to DB state: ${(err as Error).message}`);
    }
  }

  private async verifyTurnstile(token: string, secret: string, hostname?: string): Promise<void> {
    try {
      const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
        signal: AbortSignal.timeout(4000),
      });

      if (!response.ok) {
        throw new Error('Turnstile service responded with non-200');
      }

      const data = (await response.json()) as { success: boolean; hostname?: string };
      if (!data.success || (hostname && data.hostname && data.hostname !== hostname)) {
        throw new BadRequestException({ saved: false, message: 'Verification failed' });
      }
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      this.logger.warn(`Turnstile check failed: ${(err as Error).message}`);
    }
  }

  async findAll(limit = 50, offset = 0, source?: string) {
    if (this.hasDatabase()) {
      try {
        const where = source ? { source } : {};
        const [total, items] = await Promise.all([
          this.prisma.lead.count({ where }),
          this.prisma.lead.findMany({
            where,
            take: Math.min(limit, 100),
            skip: offset,
            orderBy: { submittedAt: 'desc' },
          }),
        ]);
        return { total, limit, offset, items };
      } catch (err) {
        this.logger.warn(`Prisma findAll failed: ${(err as Error).message}`);
      }
    }

    let items = Array.from(this.inMemoryLeads.values());
    if (source) items = items.filter((l) => l.source === source);
    const total = items.length;
    return { total, limit, offset, items: items.slice(offset, offset + limit) };
  }

  async findOne(id: string) {
    if (this.hasDatabase()) {
      try {
        return await this.prisma.lead.findUnique({
          where: { id },
        });
      } catch (err) {
        this.logger.warn(`Prisma findOne failed: ${(err as Error).message}`);
      }
    }
    return this.inMemoryLeads.get(id) || null;
  }

  async getStats() {
    if (this.hasDatabase()) {
      try {
        const [totalLeads, sourceGroups] = await Promise.all([
          this.prisma.lead.count(),
          this.prisma.lead.groupBy({
            by: ['source'],
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
          }),
        ]);

        return {
          totalLeads,
          sources: sourceGroups.map((group) => ({
            source: group.source,
            count: group._count.id,
          })),
        };
      } catch (err) {
        this.logger.warn(`Prisma getStats failed: ${(err as Error).message}`);
      }
    }

    const items = Array.from(this.inMemoryLeads.values());
    const counts: Record<string, number> = {};
    for (const item of items) {
      counts[item.source] = (counts[item.source] || 0) + 1;
    }
    return {
      totalLeads: items.length,
      sources: Object.entries(counts).map(([source, count]) => ({ source, count })),
    };
  }
}
