import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import GraphQLConfig from './graphql/GraphQLConfig';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './database/mikro-orm.config';
import ForgotPassword from './graphql/operations/ForgotPassword';
import SignUp from './graphql/operations/SignUp';
import Login from './graphql/operations/Login';
import ResetPassword from './graphql/operations/ResetPassword';
import AuthModule from './auth/AuthModule';
import ConfigModule from './config/ConfigModule';
import { MailConfig } from './mail/MailConfig';
import { MailerModule } from '@nestjs-modules/mailer';
import Me from './graphql/operations/Me';
import SendActivationMail from './graphql/operations/SendActivationMail';
import ActivateAccount from './graphql/operations/ActivateAccount';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRootAsync({ useFactory: () => config }),
    AuthModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfig,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfig,
    }),
  ],
  controllers: [],
  providers: [
    Me,
    Login,
    SignUp,
    ForgotPassword,
    ResetPassword,
    SendActivationMail,
    ActivateAccount,
  ],
})
export class AppModule {}
