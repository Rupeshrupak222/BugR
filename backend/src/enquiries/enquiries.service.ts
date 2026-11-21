import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { EnquiryResponseDto } from './dto/enquiry-response.dto';

@Injectable()
export class EnquiriesService {
  private readonly logger = new Logger(EnquiriesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createEnquiry(
    dto: CreateEnquiryDto,
    _clientIp?: string,
  ): Promise<EnquiryResponseDto> {
    if (dto.honeypot && dto.honeypot.trim().length > 0) {
      this.logger.warn('Spam/bot enquiry rejected via honeypot detection');
      throw new BadRequestException('Bot submission rejected');
    }

    const requestId = dto.requestId?.trim() || randomUUID();

    // Idempotency check
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

    this.logger.log(`New B2B IT enquiry recorded: ${enquiry.id} (${enquiry.company})`);

    return {
      id: enquiry.id,
      requestId: enquiry.requestId,
      status: enquiry.status,
      message: 'Project brief successfully received and queued for technical scoping.',
      submittedAt: enquiry.submittedAt.toISOString(),
    };
  }

  async findAll(limit = 50, offset = 0, serviceCategory?: string, status?: string) {
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
  }

  async findOne(id: string) {
    const enquiry = await this.prisma.projectEnquiry.findUnique({
      where: { id },
    });
    if (!enquiry) {
      throw new NotFoundException(`Project enquiry ${id} not found`);
    }
    return enquiry;
  }
}
