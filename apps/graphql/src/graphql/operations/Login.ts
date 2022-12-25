import { EntityManager } from '@mikro-orm/core';
import {
  Args,
  ArgsType,
  Field,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import Public from '../../auth/Public';
import { compare } from '../../crypto/utils/ssha';
import User from '../../database/entities/User';
import InvalidCredentials from '../../errors/InvalidCredentials';
import UnverifiedAccount from '../../errors/UnverifiedAccount';
import JwtPayload from '../objects/JwtPayload';

@ArgsType()
class LoginArgs {
  @Field({ description: 'The email to log in with' })
  email!: string;

  @Field({ description: 'The password to log in with' })
  password!: string;
}

@ObjectType()
class LoginResult {
  @Field({ description: 'The generated login JWT' })
  token!: string;

  @Field({
    description:
      'The JWT claims. They can also be obtained from the JWT payload.',
  })
  payload!: JwtPayload;
}

@Resolver()
export default class Login {
  constructor(
    private readonly em: EntityManager,
    private readonly jwt: JwtService,
  ) {}

  @Public()
  @Mutation(() => LoginResult, {
    description: 'Login in to the application with email/password credentials.',
  })
  async login(@Args() { email, password }: LoginArgs): Promise<LoginResult> {
    const user = await this.em.findOne(User, { email });

    if (!user) {
      throw new InvalidCredentials();
    }

    const currentPassword = user.password;
    console.log(password, currentPassword, compare(password, currentPassword));

    if (!currentPassword || !compare(password, currentPassword)) {
      throw new InvalidCredentials();
    }

    if (!user.verifiedAt) {
      throw new UnverifiedAccount();
    }

    const jwt = this.jwt.sign({}, { expiresIn: '1 day', subject: user.id });

    return {
      token: jwt,
      payload: this.jwt.decode(jwt, { json: true }) as JwtPayload,
    };
  }
}
