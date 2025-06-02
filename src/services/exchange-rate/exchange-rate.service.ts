import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class ExchangeRateService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    return this.prisma.exchangeRate.create({ data });
  }

  async findLatest(from: string, to: string) {
    return this.prisma.exchangeRate.findFirst({
      where: { from, to },
      orderBy: { createdAt: 'desc' },
    });
  }
}