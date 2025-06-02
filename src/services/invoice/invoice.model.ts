import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Invoice {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Float)
  amount: number;

  @Field()
  currencyCode: string;

  @Field()
  baseCurrency: string;

  @Field((type) => Float)
  exchangeRate: number;

  @Field((type) => Float)
  amountInBaseCurrency: number;

  @Field((type) => Int)
  companyId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
