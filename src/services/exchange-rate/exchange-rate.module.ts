import { Module } from '@nestjs/common';
import { ExchangeRateController } from './exchange-rate.controller';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';

@Module({
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService, ExchangeRateResolver],
})
export class ExchangeRateModule {}
