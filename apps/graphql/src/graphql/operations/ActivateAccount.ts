import { EntityManager } from '@mikro-orm/core';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Args, createUnionType, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import Public from '../../auth/Public';
import User from '../../database/entities/User';
import Success from '../objects/Success';
import InvalidTokenProblem from '../objects/problems/InvalidTokenProblem';

export const ActivateAccountResult = createUnionType({
  name: 'ActivateAccountResult',
  types: () => [Success, InvalidTokenProblem] as const,
  description: 'The result of the ActivateAccount mutation.',
});

@Injectable()
@Resolver()
export default class ActivateAccount {
  constructor(
    private readonly em: EntityManager,
    private readonly mailer: MailerService,
    private readonly jwt: JwtService,
  ) {}

  @Public()
  @Mutation(() => ActivateAccountResult, {
    description:
      'Activate new user account after clicking on the link in the activation email.',
  })
  async activateAccount(
    @Args('token', { description: 'The confirmation token received by email' })
    token: string,
  ): Promise<typeof ActivateAccountResult> {
    let email: string;

    try {
      email = this.jwt.verify<{ sub: string }>(token)?.sub;
    } catch (e) {
      return new InvalidTokenProblem();
    }

    const user = await this.em.findOneOrFail(User, { email });
    user.verifiedAt = new Date();
    await this.em.flush();

    return new Success();
  }
}
