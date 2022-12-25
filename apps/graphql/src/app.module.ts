import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GetAuthor } from './authors/GetAuthor';
import GraphQLConfig from './graphql/GraphQLConfig';
import { AppController } from './controlers/app.controller';
import { AppService } from './services/app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './database/mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({ useFactory: () => config }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GetAuthor],
})
export class AppModule {}
