import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateService } from './exchange-rate.service';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeRateService,
        {
          provide: PrismaService,
          useValue: {
            exchangeRate: {
              create: jest.fn().mockResolvedValue({
                id: 1,
                from: 'USD',
                to: 'EUR',
                rate: 1.1,
              }),
              findFirst: jest.fn().mockResolvedValue({
                id: 1,
                from: 'USD',
                to: 'EUR',
                rate: 1.1,
              }),
            },
          },
        },
      ],
    }).compile();
    service = module.get<ExchangeRateService>(ExchangeRateService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an exchange rate', async () => {
    const data = { from: 'USD', to: 'EUR', rate: 1.1, source: 'API' };
    const result = await service.create(data);
    expect(result).toEqual({ id: 1, from: 'USD', to: 'EUR', rate: 1.1 });
    expect(prisma.exchangeRate.create).toHaveBeenCalledWith({ data });
  });

  it('should find the latest exchange rate', async () => {
    const result = await service.findLatest('USD', 'EUR');
    expect(result).toEqual({ id: 1, from: 'USD', to: 'EUR', rate: 1.1 });
    expect(prisma.exchangeRate.findFirst).toHaveBeenCalledWith({
      where: { from: 'USD', to: 'EUR' },
      orderBy: { createdAt: 'desc' },
    });
  });
});
