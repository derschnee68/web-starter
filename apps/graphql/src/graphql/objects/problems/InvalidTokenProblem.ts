import { Field, ObjectType } from '@nestjs/graphql';

const invalidTokenProblem = 'This token is invalid.';

@ObjectType({ description: invalidTokenProblem })
export default class InvalidTokenProblem {
  @Field({ description: `static: ${invalidTokenProblem}` })
  message: string = invalidTokenProblem;
}
