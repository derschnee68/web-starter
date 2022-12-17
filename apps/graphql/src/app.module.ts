import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GetAuthor } from './authors/GetAuthor';
import GraphQLConfig from './graphql/GraphQLConfig';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GetAuthor],
})
export class AppModule {}
