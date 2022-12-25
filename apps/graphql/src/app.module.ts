import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GetAuthor } from './authors/GetAuthor';
import GraphQLConfig from './graphql/GraphQLConfig';
import { AppController } from './controlers/app.controller';
import { AppService } from './services/app.service';

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
