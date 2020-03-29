import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

 /****************************************************/
 /*********** GENERATED FILE - DO NOT EDIT ***********/
 /****************************************************/
 
 // tslint:disable: interface-over-type-literal array-type no-implicit-dependencies
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export type LogInResponse = {
  success: Scalars['Boolean'],
  error?: Maybe<Scalars['String']>,
  token?: Maybe<Scalars['String']>,
};

export type Mutation = {
  login?: Maybe<LogInResponse>,
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};

export type Query = {
  me?: Maybe<User>,
};


export type User = {
  id: Scalars['ID'],
  email: Scalars['String'],
};

export type LogInMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LogInMutation = { result: Maybe<Pick<LogInResponse, 'success' | 'error' | 'token'>> };

export type WhoAmIQueryVariables = {};


export type WhoAmIQuery = { me: Maybe<Pick<User, 'id' | 'email'>> };


export const LogInDocument = gql`
    mutation LogIn($email: String!, $password: String!) {
  result: login(email: $email, password: $password) {
    success
    error
    token
  }
}
    `;
export type LogInMutationFn = ApolloReactCommon.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        return ApolloReactHooks.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, baseOptions);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = ApolloReactCommon.MutationResult<LogInMutation>;
export type LogInMutationOptions = ApolloReactCommon.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const WhoAmIDocument = gql`
    query WhoAmI {
  me {
    id
    email
  }
}
    `;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
        return ApolloReactHooks.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, baseOptions);
      }
export function useWhoAmILazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, baseOptions);
        }
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmIQueryResult = ApolloReactCommon.QueryResult<WhoAmIQuery, WhoAmIQueryVariables>;