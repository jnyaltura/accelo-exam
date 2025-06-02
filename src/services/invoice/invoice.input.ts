import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceInput {
  @Field()
  title: string;

  @Field((type) => Float)
  amount: number;

  @Field()
  currencyCode: string;

  @Field((type) => Int)
  companyId: number;
}
