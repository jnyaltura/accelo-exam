import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyResolver } from './company.resolver';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyResolver],
})
export class CompanyModule {}
