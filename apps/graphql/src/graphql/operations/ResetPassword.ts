import { Injectable } from '@nestjs/common';
import { Args, ArgsType, Field, Mutation, Resolver } from '@nestjs/graphql';
import { EntityManager } from '@mikro-orm/core';
import User from '../../database/entities/User';
import Public from '../../auth/Public';
import { JwtService } from '@nestjs/jwt';
import { hash } from '../../crypto/utils/ssha';

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

@Injectable()
@Resolver()
export default class ResetPassword {
  constructor(
    private readonly jwt: JwtService,
    private readonly em: EntityManager,
  ) {}

  @Public()
  @Mutation(() => Boolean, {
    description: 'Updates the password of a user',
  })
  async resetPassword(
    @Args() { token, password }: ResetPasswordArgs,
  ): Promise<boolean> {
    let payload: TokenPayload;

    try {
      payload = this.jwt.verify(token);
    } catch (e) {
      throw new Error('Invalid reset token');
    }

    const user = await this.em.findOneOrFail(User, { email: payload.sub });

    if (!user) {
      throw new Error('Invalid reset token');
    }

    user.password = hash(password);

    await this.em.flush();
    return true;
  }
}
