import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Author } from './author.model';

@Resolver(() => Author)
export class GetAuthor {
  @Query(() => Number)
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return 23;
  }
}
