import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class ExchangeRateService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    from: string;
    to: string;
    rate: number;
    source: string;
  }): Promise<any> {
    return this.prisma.exchangeRate.create({ data });
  }

  async findLatest(from: string, to: string): Promise<any> {
    return this.prisma.exchangeRate.findFirst({
      where: { from, to },
      orderBy: { createdAt: 'desc' },
    });
  }
}
