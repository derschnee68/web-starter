import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import GraphQLConfig from './graphql/GraphQLConfig';
import { AppController } from './controlers/app.controller';
import { AppService } from './services/app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './database/mikro-orm.config';
import ForgotPassword from './graphql/operations/ForgotPassword';
import Register from './graphql/operations/Register';
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
  controllers: [AppController],
  providers: [
    AppService,
    Me,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    SendActivationMail,
    ActivateAccount,
  ],
})
export class AppModule {}
