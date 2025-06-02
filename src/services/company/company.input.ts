import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field()
  name: string;

  @Field()
  baseCurrency: string;
}

@InputType()
export class UpdateCompanyInput {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  baseCurrency?: string;
}
