import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceResolver],
})
export class InvoiceModule {}
