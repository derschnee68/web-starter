import { ApolloError } from 'apollo-server-core';

export default abstract class BaseError extends ApolloError {
  /**
   * If the extension should be reported to Sentry.
   * @returns {boolean}
   */
  abstract get shouldReport(): boolean;
}
