import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: PrismaService,
          useValue: {
            company: {
              create: jest.fn().mockResolvedValue({ id: 1, name: 'Test', baseCurrency: 'USD' }),
              findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'Test', baseCurrency: 'USD' }]),
              findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Test', baseCurrency: 'USD' }),
              update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated', baseCurrency: 'EUR' }),
            },
          },
        },
      ],
    }).compile();
    service = module.get<CompanyService>(CompanyService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a company', async () => {
    const data = { name: 'Test', baseCurrency: 'USD' };
    const result = await service.create(data);
    expect(result).toEqual({ id: 1, name: 'Test', baseCurrency: 'USD' });
    expect(prisma.company.create).toHaveBeenCalledWith({ data });
  });

  it('should find all companies', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, name: 'Test', baseCurrency: 'USD' }]);
    expect(prisma.company.findMany).toHaveBeenCalled();
  });

  it('should find one company', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({ id: 1, name: 'Test', baseCurrency: 'USD' });
    expect(prisma.company.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a company', async () => {
    const data = { name: 'Updated', baseCurrency: 'EUR' };
    const result = await service.update(1, data);
    expect(result).toEqual({ id: 1, name: 'Updated', baseCurrency: 'EUR' });
    expect(prisma.company.update).toHaveBeenCalledWith({ where: { id: 1 }, data });
  });
});
