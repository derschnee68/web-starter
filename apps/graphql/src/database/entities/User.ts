import { v4 } from 'uuid';
import {
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A user account' })
@Entity()
export default class User {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Field(() => ID, { description: 'The user ID' })
  @PrimaryKey({ type: 'uuid' })
  id = v4();

  @Field(() => String, { description: 'The user email' })
  @Property()
  @Unique()
  email!: string;

  @Field(() => String, { description: 'The user password' })
  @Property()
  password!: string;

  @Field(() => Date, { description: 'The date when the user has registered' })
  @Property({ columnType: 'datetime' })
  createdAt = new Date();

  @Field(() => Date, { description: 'The last date the user has been updated' })
  @Property({ columnType: 'datetime' })
  updatedAt = new Date();

  @Field(() => Date, {
    nullable: true,
    description: 'The date when the user has verified its email',
  })
  @Property({ columnType: 'datetime', nullable: true })
  verifiedAt: Date | null = null;
}
