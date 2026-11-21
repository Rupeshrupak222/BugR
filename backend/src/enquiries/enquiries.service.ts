import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { EnquiryResponseDto } from './dto/enquiry-response.dto';

@Injectable()
export class EnquiriesService {
  private readonly logger = new Logger(EnquiriesService.name);
  private readonly inMemoryEnquiries = new Map<string, any>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  private hasDatabase(): boolean {
    return Boolean(this.config.get<string>('DATABASE_URL'));
  }

  async createEnquiry(
    dto: CreateEnquiryDto,
    _clientIp?: string,
  ): Promise<EnquiryResponseDto> {
    if (dto.honeypot && dto.honeypot.trim().length > 0) {
      this.logger.warn('Spam/bot enquiry rejected via honeypot detection');
      throw new BadRequestException('Bot submission rejected');
    }

    const requestId = dto.requestId?.trim() || randomUUID();

    // Check database if configured
    if (this.hasDatabase()) {
      try {
        const existing = await this.prisma.projectEnquiry.findUnique({
          where: { requestId },
        });

        if (existing) {
          return {
            id: existing.id,
            requestId: existing.requestId,
            status: existing.status,
            message: 'Project enquiry already registered.',
            submittedAt: existing.submittedAt.toISOString(),
          };
        }

        const enquiry = await this.prisma.projectEnquiry.create({
          data: {
            requestId,
            name: dto.name.trim(),
            email: dto.email.trim().toLowerCase(),
            phone: dto.phone?.trim() || null,
            company: dto.company.trim(),
            serviceCategory: dto.serviceCategory.trim(),
            projectType: dto.projectType?.trim() || null,
            description: dto.description.trim(),
            budgetRange: dto.budgetRange?.trim() || null,
            timeline: dto.timeline?.trim() || null,
            features: dto.features || [],
            status: 'NEW',
          },
        });

        this.logger.log(`New B2B IT enquiry recorded in DB: ${enquiry.id} (${enquiry.company})`);

        return {
          id: enquiry.id,
          requestId: enquiry.requestId,
          status: enquiry.status,
          message: 'Project brief successfully received and queued for technical scoping.',
          submittedAt: enquiry.submittedAt.toISOString(),
        };
      } catch (dbErr) {
        this.logger.warn(
          `Prisma persistence failed, falling back to in-memory store: ${(dbErr as Error).message}`,
        );
      }
    }

    // In-memory fallback (offline / demo / staging without DB credentials)
    const existingMemory = Array.from(this.inMemoryEnquiries.values()).find(
      (e) => e.requestId === requestId,
    );
    if (existingMemory) {
      return {
        id: existingMemory.id,
        requestId: existingMemory.requestId,
        status: existingMemory.status,
        message: 'Project enquiry already registered.',
        submittedAt: existingMemory.submittedAt,
      };
    }

    const fallbackId = randomUUID();
    const submittedAt = new Date().toISOString();
    const memoryRecord = {
      id: fallbackId,
      requestId,
      name: dto.name.trim(),
      email: dto.email.trim().toLowerCase(),
      phone: dto.phone?.trim() || null,
      company: dto.company.trim(),
      serviceCategory: dto.serviceCategory.trim(),
      projectType: dto.projectType?.trim() || null,
      description: dto.description.trim(),
      budgetRange: dto.budgetRange?.trim() || null,
      timeline: dto.timeline?.trim() || null,
      features: dto.features || [],
      status: 'NEW',
      submittedAt,
    };

    this.inMemoryEnquiries.set(fallbackId, memoryRecord);
    this.logger.log(
      `New B2B IT enquiry recorded (in-memory mode): ${fallbackId} (${memoryRecord.company})`,
    );

    return {
      id: fallbackId,
      requestId,
      status: 'NEW',
      message: 'Project brief successfully received and queued for technical scoping.',
      submittedAt,
    };
  }

  async findAll(limit = 50, offset = 0, serviceCategory?: string, status?: string) {
    if (this.hasDatabase()) {
      try {
        const where: any = {};
        if (serviceCategory) where.serviceCategory = serviceCategory;
        if (status) where.status = status;

        const [items, total] = await Promise.all([
          this.prisma.projectEnquiry.findMany({
            where,
            take: limit,
            skip: offset,
            orderBy: { submittedAt: 'desc' },
          }),
          this.prisma.projectEnquiry.count({ where }),
        ]);

        return { items, total, limit, offset };
      } catch (err) {
        this.logger.warn(`Prisma query failed, serving from memory store: ${(err as Error).message}`);
      }
    }

    let items = Array.from(this.inMemoryEnquiries.values());
    if (serviceCategory) {
      items = items.filter((e) => e.serviceCategory === serviceCategory);
    }
    if (status) {
      items = items.filter((e) => e.status === status);
    }

    const total = items.length;
    const paginated = items.slice(offset, offset + limit);
    return { items: paginated, total, limit, offset };
  }

  async findOne(id: string) {
    if (this.hasDatabase()) {
      try {
        const enquiry = await this.prisma.projectEnquiry.findUnique({
          where: { id },
        });
        if (enquiry) return enquiry;
      } catch (err) {
        this.logger.warn(`Prisma query failed: ${(err as Error).message}`);
      }
    }

    const memoryRecord = this.inMemoryEnquiries.get(id);
    if (!memoryRecord) {
      throw new NotFoundException(`Project enquiry ${id} not found`);
    }
    return memoryRecord;
  }
}
