import { createHash } from 'crypto';
import type { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/core';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import Public from '../../auth/Public';
import User from '../../database/entities/User';
import resetPassword from '../../mail/templates/resetPassword/resetPassword';

@Injectable()
@Resolver()
export default class ForgotPassword {
  private readonly users: EntityRepository<User>;

  constructor(
    em: EntityManager,
    private readonly mailer: MailerService,
    private readonly jwt: JwtService,
  ) {
    this.users = em.getRepository(User);
  }

  @Public()
  @Mutation(() => Boolean, {
    description:
      'Request the application to send an email with link to reset the user password.',
  })
  async forgotPassword(@Args('email') email: string): Promise<boolean> {
    const user = await this.users.findOne({ email });

    if (!user) {
      // We still return true to prevent blind attacks
      return true;
    }

    const password = await this.ldap
      .findUser(user.id)
      .then((u) => u.userPassword);

    await this.mailer.sendMail(
      await resetPassword(
        { to: user.email },
        {
          token: this.jwt.sign(
            {
              sum: createHash('md5').update(password).digest('hex'),
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
