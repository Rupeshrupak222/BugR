import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EnquiriesService } from './enquiries.service';

describe('EnquiriesService', () => {
  let service: EnquiriesService;
  let prisma: PrismaService;

  const mockPrisma = {
    projectEnquiry: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnquiriesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<EnquiriesService>(EnquiriesService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should reject honeypot bot submissions', async () => {
    await expect(
      service.createEnquiry({
        name: 'Spam Bot',
        email: 'bot@spam.com',
        company: 'Spam Corp',
        serviceCategory: 'custom-software-development',
        description: 'Spam link here',
        honeypot: 'http://malicious.link',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should create a valid enquiry with idempotency check', async () => {
    mockPrisma.projectEnquiry.findUnique.mockResolvedValue(null);
    mockPrisma.projectEnquiry.create.mockResolvedValue({
      id: 'mock-uuid-1234',
      requestId: 'req-001',
      name: 'Jane Doe',
      email: 'jane@enterprise.com',
      company: 'Enterprise Co',
      serviceCategory: 'cloud-devops',
      description: 'Migrate to multi-region AWS with Kubernetes and zero downtime.',
      status: 'NEW',
      submittedAt: new Date(),
    });

    const result = await service.createEnquiry({
      requestId: 'req-001',
      name: 'Jane Doe',
      email: 'jane@enterprise.com',
      company: 'Enterprise Co',
      serviceCategory: 'cloud-devops',
      description: 'Migrate to multi-region AWS with Kubernetes and zero downtime.',
    });

    expect(result.id).toBe('mock-uuid-1234');
    expect(result.status).toBe('NEW');
    expect(mockPrisma.projectEnquiry.create).toHaveBeenCalled();
  });

  it('should return existing record if requestId was already submitted', async () => {
    const submittedAt = new Date();
    mockPrisma.projectEnquiry.findUnique.mockResolvedValue({
      id: 'existing-uuid',
      requestId: 'req-duplicate',
      status: 'NEW',
      submittedAt,
    });

    const result = await service.createEnquiry({
      requestId: 'req-duplicate',
      name: 'Jane Doe',
      email: 'jane@enterprise.com',
      company: 'Enterprise Co',
      serviceCategory: 'cloud-devops',
      description: 'Duplicate submission request.',
    });

    expect(result.id).toBe('existing-uuid');
    expect(mockPrisma.projectEnquiry.create).not.toHaveBeenCalled();
  });
});
