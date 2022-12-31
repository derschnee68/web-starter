import { Injectable } from '@nestjs/common';
import {
  Args,
  ArgsType,
  createUnionType,
  Field,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { EntityManager } from '@mikro-orm/core';
import User from '../../database/entities/User';
import Public from '../../auth/Public';
import { JwtService } from '@nestjs/jwt';
import { hash } from '../../crypto/utils/ssha';
import Success from '../objects/Success';
import InvalidTokenProblem from '../objects/problems/InvalidTokenProblem';

type TokenPayload = { sum: string; sub: string; exp: number };

@ArgsType()
class ResetPasswordArgs {
  @Field({
    description: 'The JWT token associated to the reset password request',
  })
  token!: string;

  @Field({ description: 'The new password to use' })
  password!: string;
}

export const ResetPasswordResult = createUnionType({
  name: 'ResetPasswordResult',
  types: () => [Success, InvalidTokenProblem] as const,
  description: 'The result of the ResetPassword mutation.',
});

@Injectable()
@Resolver()
export default class ResetPassword {
  constructor(
    private readonly jwt: JwtService,
    private readonly em: EntityManager,
  ) {}

  @Public()
  @Mutation(() => ResetPasswordResult, {
    description: 'Updates the password of a user.',
  })
  async resetPassword(
    @Args() { token, password }: ResetPasswordArgs,
  ): Promise<typeof ResetPasswordResult> {
    let payload: TokenPayload;

    try {
      payload = this.jwt.verify(token);
    } catch (e) {
      return new InvalidTokenProblem();
    }

    const user = await this.em.findOneOrFail(User, { email: payload.sub });

    if (!user) {
      return new InvalidTokenProblem();
    }

    user.password = hash(password);

    await this.em.flush();
    return new Success();
  }
}
