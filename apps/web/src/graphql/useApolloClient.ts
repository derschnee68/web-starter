import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import useJwt from '../lib/auth/useJwt';
import env from '../lib/env';
import { isServer } from '../lib/utils/platform';
import { toast } from 'react-toastify';

export default function useApolloClient(): ApolloClient<NormalizedCacheObject> {
  const router = useRouter();
  const { jwt, clear } = useJwt();
  const cache = useMemo(() => new InMemoryCache(), []);

  const httpLink = useMemo(() => {
    return new HttpLink({
      uri: env.NEXT_PUBLIC_GRAPHQL_URI,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
  }, [jwt]);

  const errorLink = onError(({ graphQLErrors }) => {
    if (Array.isArray(graphQLErrors)) {
      for (const error of graphQLErrors) {
        if (error.extensions?.code === 'UNAUTHENTICATED') {
          clear();
          void router.replace({
            pathname: '/auth/login',
            query: {
              next: router.pathname,
            },
          });
        }
      }

      const error = graphQLErrors[0];

      if (['ARCHIPEL_USER_ERROR', 'UNVERIFIED_ACCOUNT'].includes(error.extensions?.code)) {
        toast(error.message, { type: 'info' });
      } else if (error.extensions?.code === 'ARCHIPEL_ERROR') {
        toast('An error has occured on our side, our team will make it work in the best delays.', { type: 'error' });
      }
    }
  });

  return useMemo(() => {
    return new ApolloClient({
      ssrMode: isServer(),
      link: from([errorLink, httpLink]),
      cache,
    });
  }, [cache, errorLink, httpLink]);
}
