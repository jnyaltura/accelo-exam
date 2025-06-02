import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.model';
import { CreateInvoiceInput } from './invoice.input';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Query(() => [Invoice])
  async invoices() {
    return this.invoiceService.findAll();
  }

  @Query(() => Invoice, { nullable: true })
  async invoice(@Args('id', { type: () => Int }) id: number) {
    return this.invoiceService.findOne(id);
  }

  @Mutation(() => Invoice)
  async createInvoice(@Args('input') input: CreateInvoiceInput) {
    return this.invoiceService.create(input);
  }
}
