import { EntityManager } from '@mikro-orm/core';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import Public from '../../auth/Public';
import User from '../../database/entities/User';
import InvalidToken from '../../errors/InvalidToken';

@Injectable()
@Resolver()
export default class ActivateAccount {
  constructor(
    private readonly em: EntityManager,
    private readonly mailer: MailerService,
    private readonly jwt: JwtService,
  ) {}

  @Public()
  @Mutation(() => Boolean, {
    description:
      'Activate new user account after clicking on the link in the activation email',
  })
  async activateAccount(@Args('token') token: string): Promise<boolean> {
    let email: string;

    try {
      email = this.jwt.verify<{ sub: string }>(token)?.sub;
    } catch (e) {
      throw new InvalidToken();
    }

    const user = await this.em.findOneOrFail(User, { email });
    user.verifiedAt = new Date();
    await this.em.flush();

    return true;
  }
}
