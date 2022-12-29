import { EntityManager } from '@mikro-orm/core';
import { MailerService } from '@nestjs-modules/mailer';
import { Args, ArgsType, Field, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import Public from '../../auth/Public';
import User from '../../database/entities/User';
import activateAccount from '../../mail/templates/activateAccount/activateAccount';
import { isEnvironment } from '../../utils/environment';
import Req from '../decorators/Req';
import { Request } from 'express';
import { ApolloError } from 'apollo-server-core';
import { createHash } from 'crypto';
import { hash } from '../../crypto/utils/ssha';

@ArgsType()
class RegisterArgs {
  @Field({ description: 'The email to use for the account creation' })
  email!: string;

  @Field({ description: 'The password to use for the account creation' })
  password!: string;
}

@Resolver()
export default class Register {
  constructor(
    private readonly em: EntityManager,
    private readonly jwt: JwtService,
    private readonly mailer: MailerService,
  ) {}

  @Public()
  @Mutation(() => Boolean, {
    description:
      'Create new user account by providing email/password credentials.',
  })
  async register(
    @Args() { email, password: clearPassword }: RegisterArgs,
    @Req() req: Request,
  ) {
    if (await this.em.findOne(User, { email: email })) {
      throw new ApolloError(
        'This email is already linked to an account.',
        'DUPLICATE_EMAIL',
      );
    }

    const password = hash(clearPassword);

    const user = this.em.create(User, {
      email,
      password,
    });

    // Allow Cypress to bypass the email verification via the x-verification-bypass header
    if (
      req.headers['x-verification-bypass'] === 'true' &&
      isEnvironment('test')
    ) {
      user.verifiedAt = new Date();
    }

    await this.em.persistAndFlush(user);

    await this.mailer.sendMail(
      await activateAccount(
        { to: user.email },
        {
          token: this.jwt.sign(
            {
              sum: password,
            },
            {
              subject: email,
              expiresIn: '6 hours',
            },
          ),
        },
      ),
    );

    return true;
  }
}
