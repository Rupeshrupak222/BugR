import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { LeadsService } from './leads.service';

describe('LeadsService', () => {
  let service: LeadsService;
  let prisma: PrismaService;

  const mockPrisma = {
    lead: {
      findUnique: jest.fn(),
      create: jest.fn(),
      count: jest.fn().mockResolvedValue(10),
      findMany: jest.fn().mockResolvedValue([]),
      groupBy: jest.fn().mockResolvedValue([]),
    },
    leadRateAttempt: {
      count: jest.fn().mockResolvedValue(0),
      create: jest.fn().mockResolvedValue({}),
    },
  };

  const mockConfig = {
    get: jest.fn((key: string) => {
      if (key === 'DATABASE_URL') return 'postgresql://mock';
      if (key === 'TURNSTILE_SITE_KEY') return '0x4AAAAAA';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ConfigService, useValue: mockConfig },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should reject honeypot submissions', async () => {
    await expect(
      service.createLead(
        {
          requestId: 'c8087268-306d-495d-9fc0-42ba2cfa5fbc',
          name: 'Bot User',
          email: 'bot@example.com',
          phone: '+1234567890',
          source: 'Students',
          website: 'http://spam.com',
        },
        '127.0.0.1',
      ),
    ).rejects.toThrow();
  });

  it('should record a valid lead and return saved: true', async () => {
    mockPrisma.lead.findUnique.mockResolvedValue(null);
    mockPrisma.lead.create.mockResolvedValue({
      id: 'mock-lead-id-123',
      source: 'Python Full Stack',
      email: 'alex@example.com',
    });

    const result = await service.createLead(
      {
        requestId: 'c8087268-306d-495d-9fc0-42ba2cfa5fbc',
        name: 'Alex Mercer',
        email: 'alex@example.com',
        phone: '+91 9876543210',
        source: 'Python Full Stack',
      },
      '127.0.0.1',
    );

    expect(result.saved).toBe(true);
    expect(result.id).toBe('mock-lead-id-123');
  });

  it('should return public config status', () => {
    const config = service.getPublicConfig();
    expect(config.enabled).toBe(true);
    expect(config.siteKey).toBe('0x4AAAAAA');
  });
});
