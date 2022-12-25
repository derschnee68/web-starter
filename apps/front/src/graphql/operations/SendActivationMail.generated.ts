import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendActivationMailMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;

export type SendActivationMailMutation = { __typename?: 'Mutation'; sendActivationMail: boolean };

export const SendActivationMailDocument = gql`
  mutation SendActivationMail($email: String!) {
    sendActivationMail(email: $email)
  }
`;
export type SendActivationMailMutationFn = Apollo.MutationFunction<
  SendActivationMailMutation,
  SendActivationMailMutationVariables
>;

/**
 * __useSendActivationMailMutation__
 *
 * To run a mutation, you first call `useSendActivationMailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendActivationMailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendActivationMailMutation, { data, loading, error }] = useSendActivationMailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendActivationMailMutation(
  baseOptions?: Apollo.MutationHookOptions<SendActivationMailMutation, SendActivationMailMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendActivationMailMutation, SendActivationMailMutationVariables>(
    SendActivationMailDocument,
    options,
  );
}
export type SendActivationMailMutationHookResult = ReturnType<typeof useSendActivationMailMutation>;
export type SendActivationMailMutationResult = Apollo.MutationResult<SendActivationMailMutation>;
export type SendActivationMailMutationOptions = Apollo.BaseMutationOptions<
  SendActivationMailMutation,
  SendActivationMailMutationVariables
>;
