import { Field, ObjectType } from '@nestjs/graphql';

// This object is only needed as it is impossible to have a union of Scalar and Object types (with the Problem object types)
@ObjectType({ description: 'The query or mutation is a success.' })
export default class Success {
  @Field(() => Boolean, { description: 'Returns true.' })
  success = true;
}
