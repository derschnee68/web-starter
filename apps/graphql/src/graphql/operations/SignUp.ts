import { EntityManager } from '@mikro-orm/core';
import { MailerService } from '@nestjs-modules/mailer';
import {
  Args,
  ArgsType,
  createUnionType,
  Field,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import Public from '../../auth/Public';
import User from '../../database/entities/User';
import { isEnvironment } from '../../utils/environment';
import Req from '../decorators/Req';
import { Request } from 'express';
import { hash } from '../../crypto/utils/ssha';
import Success from '../objects/Success';

@ArgsType()
class RegisterArgs {
  @Field({ description: 'The email to use for the account creation' })
  email!: string;

  @Field({ description: 'The password to use for the account creation' })
  password!: string;
}

const duplicateEmailProblem = 'This email already exists.';

@ObjectType({ description: duplicateEmailProblem })
class DuplicateEmailProblem {
  @Field({ description: `static: ${duplicateEmailProblem}` })
  message: string = duplicateEmailProblem;
}

export const SignUpResult = createUnionType({
  name: 'SignUpResult',
  types: () => [Success, DuplicateEmailProblem] as const,
  description: 'The result of the SignUp mutation.',
});

@Resolver()
export default class SignUp {
  constructor(
    private readonly em: EntityManager,
    private readonly jwt: JwtService,
    private readonly mailer: MailerService,
  ) {}

  @Public()
  @Mutation(() => SignUpResult, {
    description:
      'Create a new user account by providing email/password credentials.',
  })
  async signUp(
    @Args() { email, password: clearPassword }: RegisterArgs,
    @Req() req: Request,
  ): Promise<typeof SignUpResult> {
    if (await this.em.findOne(User, { email: email })) {
      return new DuplicateEmailProblem();
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
    /*
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
    */

    return new Success();
  }
}
