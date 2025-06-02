import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    const company = await this.prisma.company.findUnique({ where: { id: data.companyId } });
    if (!company) throw new Error('Company not found');

    // Get the latest exchange rate
    const latestRate = await this.prisma.exchangeRate.findFirst({
      where: { from: data.currencyCode, to: company.baseCurrency },
      orderBy: { createdAt: 'desc' },
    });
    if (!latestRate) throw new Error('Exchange rate not found');

    const amountInBaseCurrency = data.amount * latestRate.rate;

    return await this.prisma.invoice.create({
      data: {
        title: data.title,
        amount: data.amount,
        currencyCode: data.currencyCode,
        baseCurrency: company.baseCurrency,
        exchangeRate: latestRate.rate,
        amountInBaseCurrency,
        companyId: data.companyId,
      },
    });
  }

  async findAll() {
    return await this.prisma.invoice.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.invoice.findUnique({ where: { id } });
  }

  async update(id: number, data) {
    return await this.prisma.invoice.update({ where: { id }, data });
  }
}