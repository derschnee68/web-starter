import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAuthorQueryVariables = Types.Exact<{
  number: Types.Scalars['Int'];
}>;

export type GetAuthorQuery = { __typename?: 'Query'; getAuthor: number };

export const GetAuthorDocument = gql`
  query GetAuthor($number: Int!) {
    getAuthor(id: $number)
  }
`;

/**
 * __useGetAuthorQuery__
 *
 * To run a query within a React component, call `useGetAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorQuery({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useGetAuthorQuery(baseOptions: Apollo.QueryHookOptions<GetAuthorQuery, GetAuthorQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAuthorQuery, GetAuthorQueryVariables>(GetAuthorDocument, options);
}
export function useGetAuthorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorQuery, GetAuthorQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAuthorQuery, GetAuthorQueryVariables>(GetAuthorDocument, options);
}
export type GetAuthorQueryHookResult = ReturnType<typeof useGetAuthorQuery>;
export type GetAuthorLazyQueryHookResult = ReturnType<typeof useGetAuthorLazyQuery>;
export type GetAuthorQueryResult = Apollo.QueryResult<GetAuthorQuery, GetAuthorQueryVariables>;
