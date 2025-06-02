import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRate } from './exchange-rate.model';
import { CreateExchangeRateInput } from './exchange-rate.input';

@Resolver(() => ExchangeRate)
export class ExchangeRateResolver {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Query(() => ExchangeRate, { nullable: true })
  async latestExchangeRate(
    @Args('from') from: string,
    @Args('to') to: string,
  ) {
    return this.exchangeRateService.findLatest(from, to);
  }

  @Mutation(() => ExchangeRate)
  async createExchangeRate(@Args('input') input: CreateExchangeRateInput) {
    return this.exchangeRateService.create(input);
  }
}
