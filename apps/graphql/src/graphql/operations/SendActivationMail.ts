import { EntityManager } from '@mikro-orm/core';
import { MailerService } from '@nestjs-modules/mailer';
import { Args, ArgsType, Field, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import Public from '../../auth/Public';
import activateAccount from '../../mail/templates/activateAccount/activateAccount';
import User from '../../database/entities/User';

@ArgsType()
class SendActivationMailArgs {
  @Field({ description: 'The email address to send the activation mail to' })
  email!: string;
}

@Resolver()
export default class SendActivationMail {
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
  async sendActivationMail(@Args() { email }: SendActivationMailArgs) {
    const userId = (await this.em.findOneOrFail(User, { email })).id;

    await this.mailer.sendMail(
      await activateAccount(
        { to: email },
        {
          token: this.jwt.sign(
            {
              sum: user.userPassword,
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
