import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivateAccountMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;

export type ActivateAccountMutation = { __typename?: 'Mutation'; activateAccount: boolean };

export const ActivateAccountDocument = gql`
  mutation ActivateAccount($token: String!) {
    activateAccount(token: $token)
  }
`;
export type ActivateAccountMutationFn = Apollo.MutationFunction<
  ActivateAccountMutation,
  ActivateAccountMutationVariables
>;

/**
 * __useActivateAccountMutation__
 *
 * To run a mutation, you first call `useActivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateAccountMutation, { data, loading, error }] = useActivateAccountMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useActivateAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<ActivateAccountMutation, ActivateAccountMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ActivateAccountMutation, ActivateAccountMutationVariables>(
    ActivateAccountDocument,
    options,
  );
}
export type ActivateAccountMutationHookResult = ReturnType<typeof useActivateAccountMutation>;
export type ActivateAccountMutationResult = Apollo.MutationResult<ActivateAccountMutation>;
export type ActivateAccountMutationOptions = Apollo.BaseMutationOptions<
  ActivateAccountMutation,
  ActivateAccountMutationVariables
>;
