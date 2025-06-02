import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller()
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Get('companies')
  async findAll() {
    return await this.service.findAll();
  }

  @Get('company/:id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(Number(id));
  }

  @Post('company')
  async create(@Body() body: { name: string; baseCurrency: string }) {
    return await this.service.create(body);
  }

  @Post('company/:id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; baseCurrency?: string },
  ) {
    return await this.service.update(Number(id), body);
  }
}
