import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReadUserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ReadUserQuery = { __typename?: 'Query'; me: { __typename?: 'User'; id: string; email: string } };

export const ReadUserDocument = gql`
  query ReadUser {
    me {
      id
      email
    }
  }
`;

/**
 * __useReadUserQuery__
 *
 * To run a query within a React component, call `useReadUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useReadUserQuery(baseOptions?: Apollo.QueryHookOptions<ReadUserQuery, ReadUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReadUserQuery, ReadUserQueryVariables>(ReadUserDocument, options);
}
export function useReadUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReadUserQuery, ReadUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReadUserQuery, ReadUserQueryVariables>(ReadUserDocument, options);
}
export type ReadUserQueryHookResult = ReturnType<typeof useReadUserQuery>;
export type ReadUserLazyQueryHookResult = ReturnType<typeof useReadUserLazyQuery>;
export type ReadUserQueryResult = Apollo.QueryResult<ReadUserQuery, ReadUserQueryVariables>;
