import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  baseCurrency: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
