import Author from '../components/Author';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import useApolloClient from '../graphql/useApolloClient';

export default function Web() {
  const apollo = useApolloClient();

  return (
    <>
      <Head>
        <title>Web starter</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apollo}>
        <h1>Web</h1>
        <Author />
      </ApolloProvider>
    </>
  );
}
