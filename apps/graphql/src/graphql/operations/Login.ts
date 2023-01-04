import { EntityManager } from '@mikro-orm/core';
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
import { compare } from '../../crypto/utils/ssha';
import User from '../../database/entities/User';
import JwtPayload from '../objects/JwtPayload';

@ArgsType()
class LoginArgs {
  @Field({ description: 'The email to log in with' })
  email!: string;

  @Field({ description: 'The password to log in with' })
  password!: string;
}

@ObjectType({ description: 'The login mutation is a success.' })
class LoginSuccess {
  @Field({ description: 'The generated login JWT' })
  token!: string;

  @Field({
    description:
      'The JWT claims. They can also be obtained from the JWT payload.',
  })
  payload!: JwtPayload;

  constructor(_token: string, _payload: JwtPayload) {
    this.token = _token;
    this.payload = _payload;
  }
}

const invalidCredentialsMessage =
  'The email and password combination is invalid.';

@ObjectType({ description: invalidCredentialsMessage })
class InvalidCredentialsProblem {
  @Field({ description: `static: ${invalidCredentialsMessage}` })
  message: string = invalidCredentialsMessage;
}

const unverifiedAccountMessage = 'This email is not verified.';

@ObjectType({ description: unverifiedAccountMessage })
class UnverifiedAccountProblem {
  @Field({ description: `static: ${unverifiedAccountMessage}` })
  message: string = unverifiedAccountMessage;
}

export const LoginResult = createUnionType({
  name: 'LoginResult',
  types: () =>
    [
      LoginSuccess,
      InvalidCredentialsProblem,
      UnverifiedAccountProblem,
    ] as const,
  description: 'The result of the Login mutation.',
});

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
  async login(
    @Args() { email, password }: LoginArgs,
  ): Promise<typeof LoginResult> {
    const user = await this.em.findOne(User, { email });

    if (!user) {
      return new InvalidCredentialsProblem();
    }

    const currentPassword = user.password;

    if (!currentPassword || !compare(password, currentPassword)) {
      return new InvalidCredentialsProblem();
    }

    if (!user.verifiedAt) {
      return new UnverifiedAccountProblem();
    }

    const jwt = this.jwt.sign({}, { expiresIn: '1 day', subject: user.id });

    return new LoginSuccess(
      jwt,
      this.jwt.decode(jwt, { json: true }) as JwtPayload,
    );
  }
}
