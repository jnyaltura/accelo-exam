import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller()
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Get('invoice')
  async findAll() {
    return await this.service.findAll();
  }

  @Get('invoice/:id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(Number(id));
  }

  @Post('invoice')
  async create(@Body() body) {
    return await this.service.create(body);
  }

  @Post('invoice/:id')
  async update(@Param('id') id: string, @Body() body) {
    return await this.service.update(Number(id), body);
  }
}