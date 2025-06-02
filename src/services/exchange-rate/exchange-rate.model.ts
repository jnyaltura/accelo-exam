import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ExchangeRate {
  @Field(type => Int)
  id: number;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field(type => Float)
  rate: number;

  @Field()
  source: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
