import { GraphQLClient } from 'graphql-request';
import { JWT_KEY } from '../../src/lib/auth/useJwt';
import env from '../../src/lib/env';
import { getSdk } from './sdk';

const client = getSdk(new GraphQLClient(env.NEXT_PUBLIC_GRAPHQL_URI), (action) => {
  if (typeof localStorage !== 'undefined') {
    const jwt = localStorage.getItem(JWT_KEY);

    if (jwt) {
      return action({ Authorization: `Bearer ${jwt}` });
    }
  }

  return action();
});

export default client;
