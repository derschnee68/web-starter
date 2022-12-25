import type { GraphQLError } from 'graphql';
import type { ApolloError } from '@apollo/client/errors';

export default function onError(match: Record<string, (error: GraphQLError) => void>): (error: ApolloError) => void {
  return (error: ApolloError) => {
    let shouldThrow = false;

    if (Array.isArray(error.graphQLErrors) && error.graphQLErrors.length > 0) {
      for (const graphQLError of error.graphQLErrors) {
        const code = graphQLError?.extensions?.code;

        if (typeof code !== 'string') {
          shouldThrow = true;
          break;
        }

        if (code in match) {
          match[code](graphQLError);
        } else if ('default' in match) {
          match.default(graphQLError);
        } else {
          shouldThrow = true;
          break;
        }
      }
    }

    if (shouldThrow) {
      throw error;
    }
  };
}
