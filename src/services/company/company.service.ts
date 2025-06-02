import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; baseCurrency: string }) {
    return await this.prisma.company.create({ data });
  }

  async findAll() {
    return await this.prisma.company.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.company.findUnique({ where: { id } });
  }

  async update(id: number, data: { name?: string; baseCurrency?: string }) {
    return await this.prisma.company.update({ where: { id }, data });
  }
}