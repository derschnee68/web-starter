import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import User from '../../database/entities/User';
import UserId from '../decorators/UserId';

@Resolver()
@Injectable()
export default class Me {
  constructor(private readonly em: EntityManager) {}

  @Query(() => User, { description: 'Return user entity related to the logged in user' })
  me(@UserId() userId: string): Promise<User> {
    return this.em.findOneOrFail(User, { id: userId });
  }
}
