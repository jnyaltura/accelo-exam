import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import axios from 'axios';

@Controller()
export class ExchangeRateController {
  constructor(private readonly service: ExchangeRateService) {}

  @Get('rates')
  async get(@Query('from') from: string, @Query('to') to: string) {
    return await this.service.findLatest(from, to);
  }

  @Get('rates/live')
  async getLive(@Query('from') from: string, @Query('to') to: string) {
    // Fetch live rate from external API
    const url = `https://api.fxratesapi.com/latest?base=${from}&symbols=${to}`;
    const response = await axios.get(url);
    const rate = response.data.rates?.[to];
    const rateData = {
      from,
      to,
      rate,
      source: 'fxratesapi.com',
    };
    // Save to database
    await this.service.create(rateData);
    return rateData;
  }

  @Post('rates')
  async create(@Body() body) {
    return await this.service.create(body);
  }
}