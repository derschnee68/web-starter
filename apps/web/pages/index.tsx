import { Button } from 'ui';
import Author from '../src/components/Author';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import useApolloClient from '../src/graphql/useApolloClient';

export default function Web() {
  const apollo = useApolloClient();

  return (
    <>
      <Head>
        <title>Web starter</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apollo}>
        <div>
          <h1>Web</h1>
          <Author />
          <Button />
        </div>
      </ApolloProvider>
    </>
  );
}
