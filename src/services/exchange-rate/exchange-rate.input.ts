import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateExchangeRateInput {
  @Field()
  from: string;

  @Field()
  to: string;

  @Field(type => Float)
  rate: number;

  @Field()
  source: string;
}
