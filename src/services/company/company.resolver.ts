import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './company.model';
import { CreateCompanyInput, UpdateCompanyInput } from './company.input';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company])
  async companies() {
    return this.companyService.findAll();
  }

  @Query(() => Company, { nullable: true })
  async company(@Args('id', { type: () => Int }) id: number) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => Company)
  async createCompany(@Args('input') input: CreateCompanyInput) {
    return this.companyService.create(input);
  }

  @Mutation(() => Company)
  async updateCompany(@Args('input') input: UpdateCompanyInput) {
    const { id, ...data } = input;
    return this.companyService.update(id, data);
  }
}
