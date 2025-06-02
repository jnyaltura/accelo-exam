import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: PrismaService,
          useValue: {
            company: {
              findUnique: jest.fn().mockResolvedValue({ id: 1, baseCurrency: 'USD' }),
            },
            exchangeRate: {
              findFirst: jest.fn().mockResolvedValue({ rate: 1.1 }),
            },
            invoice: {
              create: jest.fn().mockResolvedValue({ id: 1, title: 'Invoice 1', amount: 100 }),
              findMany: jest.fn().mockResolvedValue([{ id: 1, title: 'Invoice 1', amount: 100 }]),
              findUnique: jest.fn().mockResolvedValue({ id: 1, title: 'Invoice 1', amount: 100 }),
              update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Invoice', amount: 200 }),
            },
          },
        },
      ],
    }).compile();
    service = module.get<InvoiceService>(InvoiceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an invoice', async () => {
    const data = { title: 'Invoice 1', amount: 100, currencyCode: 'USD', companyId: 1 };
    const result = await service.create(data);
    expect(result).toHaveProperty('id');
    expect(prisma.invoice.create).toHaveBeenCalled();
  });

  it('should find all invoices', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, title: 'Invoice 1', amount: 100 }]);
    expect(prisma.invoice.findMany).toHaveBeenCalled();
  });

  it('should find one invoice', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({ id: 1, title: 'Invoice 1', amount: 100 });
    expect(prisma.invoice.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update an invoice', async () => {
    const data = { title: 'Updated Invoice', amount: 200 };
    const result = await service.update(1, data);
    expect(result).toEqual({ id: 1, title: 'Updated Invoice', amount: 200 });
    expect(prisma.invoice.update).toHaveBeenCalledWith({ where: { id: 1 }, data });
  });
});
