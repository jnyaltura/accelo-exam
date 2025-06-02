import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './services/company/company.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { ExchangeRateModule } from './services/exchange-rate/exchange-rate.module';
import { InvoiceModule } from './services/invoice/invoice.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      sortSchema: true,
    }),
    CompanyModule,
    ExchangeRateModule,
    InvoiceModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
