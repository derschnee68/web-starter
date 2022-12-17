import type { Context, PluginDefinition } from 'apollo-server-core';
import type { GraphQLRequestContextDidEncounterErrors } from 'apollo-server-types';
import * as Sentry from '@sentry/node';
import BaseError from '../../errors/BaseError';

/**
 * Send GraphQL errors to Sentry.
 * @type {PluginDefinition}
 * @link https://github.com/getsentry/sentry-javascript/issues/4164#issuecomment-971451610
 */
const SentryApolloPlugin: PluginDefinition = {
  async requestDidStart() {
    return Promise.resolve({
      didEncounterErrors(ctx: GraphQLRequestContextDidEncounterErrors<Context>) {
        // If we couldn't parse the operation, don't do anything here
        if (!ctx.operation) {
          return Promise.resolve();
        }

        for (const err of ctx.errors) {
          // Only report internal server errors, all errors extending BaseError should be user-facing
          if (err.originalError instanceof BaseError && !err.originalError.shouldReport) {
            continue;
          }

          // Add scoped report details and send to Sentry
          Sentry.withScope((scope) => {
            // Annotate whether failing operation was query/mutation/subscription
            scope.setTag('kind', ctx.operation?.operation);

            // Log query and variables as extras (make sure to strip out sensitive data!)
            scope.setExtra('query', ctx.request.query);
            scope.setExtra('variables', ctx.request.variables);

            if (err.path) {
              // We can also add the path as breadcrumb
              scope.addBreadcrumb({
                category: 'query-path',
                message: err.path.join(' > '),
                level: 'debug',
              });
            }

            const transactionId = ctx.request.http?.headers.get('x-transaction-id');

            if (transactionId) {
              scope.setTransactionName(transactionId);
            }

            Sentry.captureException(err);
          });
        }

        return Promise.resolve();
      },
    });
  },
};

export default SentryApolloPlugin;
