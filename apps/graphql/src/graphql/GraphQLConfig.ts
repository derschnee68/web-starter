import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'node:path';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import type { GqlOptionsFactory } from '@nestjs/graphql';
import { isProduction } from '../utils/environment';
import SentryApolloPlugin from './plugins/SentryApolloPlugin';

@Injectable()
export default class GraphQLConfig
  implements GqlOptionsFactory<ApolloDriverConfig>
{
  createGqlOptions():
    | Promise<Omit<ApolloDriverConfig, 'driver'>>
    | Omit<ApolloDriverConfig, 'driver'> {
    return {
      bodyParserConfig: false,
      autoSchemaFile: isProduction()
        ? true
        : join(process.cwd(), 'schema.graphql'),
      playground: false,
      introspection: true, // was !isProduction(), but we expose teh schema during development
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
        SentryApolloPlugin,
      ],
    };
  }
}
