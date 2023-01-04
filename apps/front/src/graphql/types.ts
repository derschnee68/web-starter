export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

/** This email already exists. */
export type DuplicateEmailProblem = {
  __typename?: 'DuplicateEmailProblem';
  /** static: This email already exists. */
  message: Scalars['String'];
};

/** The email and password combination is invalid. */
export type InvalidCredentialsProblem = {
  __typename?: 'InvalidCredentialsProblem';
  /** static: The email and password combination is invalid. */
  message: Scalars['String'];
};

/** This token is invalid. */
export type InvalidTokenProblem = {
  __typename?: 'InvalidTokenProblem';
  /** static: This token is invalid. */
  message: Scalars['String'];
};

/** JWT registered claims as described in the [RFC7519](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1) */
export type JwtPayload = {
  __typename?: 'JwtPayload';
  /** The JWT audience */
  aud: Scalars['String'];
  /** When the JWT expires. */
  exp: Scalars['Int'];
  /** When the JWT was issued. */
  iat: Scalars['Int'];
  /** The JWT issuer */
  iss: Scalars['String'];
  /** The JWT ID */
  jti: Scalars['String'];
  /** When the JWT is considered as valid. */
  nbf?: Maybe<Scalars['Int']>;
  /** The JWT subject */
  sub: Scalars['String'];
};

export type LoginResult = InvalidCredentialsProblem | LoginSuccess | UnverifiedAccountProblem;

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  /** The JWT claims. They can also be obtained from the JWT payload. */
  payload: JwtPayload;
  /** The generated login JWT */
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Activate new user account after clicking on the link in the activation email */
  activateAccount: Scalars['Boolean'];
  /** Request the application to send an email with link to reset the user password. */
  forgotPassword: Scalars['Boolean'];
  /** Login in to the application with email/password credentials. */
  login: LoginResult;
  /** Updates the password of a user */
  resetPassword: ResetPasswordResult;
  /** Create new user account by providing email/password credentials. */
  sendActivationMail: Scalars['Boolean'];
  /** Create new user account by providing email/password credentials. */
  signUp: SignUpResult;
};

export type MutationActivateAccountArgs = {
  token: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationSendActivationMailArgs = {
  email: Scalars['String'];
};

export type MutationSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Return user entity related to the logged in user */
  me: User;
};

export type ResetPasswordResult = InvalidTokenProblem | Success;

export type SignUpResult = DuplicateEmailProblem | Success;

/** The query or mutation is a success. */
export type Success = {
  __typename?: 'Success';
  /** Returns true. */
  success: Scalars['Boolean'];
};

/** This email is not verified. */
export type UnverifiedAccountProblem = {
  __typename?: 'UnverifiedAccountProblem';
  /** static: This email is not verified. */
  message: Scalars['String'];
};

/** A user account */
export type User = {
  __typename?: 'User';
  /** The date when the user has registered */
  createdAt: Scalars['DateTime'];
  /** The user email */
  email: Scalars['String'];
  /** The user ID */
  id: Scalars['ID'];
  /** The user password */
  password: Scalars['String'];
  /** The last date the user has been updated */
  updatedAt: Scalars['DateTime'];
  /** The date when the user has verified its email */
  verifiedAt?: Maybe<Scalars['DateTime']>;
};
