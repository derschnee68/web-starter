# Continuous integration

## Linting and formatting

We use [ESLint](https://eslint.org/) for our JavaScript/TypeScript project and [Prettier](https://prettier.io/) as
default formatter.

- The shared ESLint configuration can be found in [`libs/eslint-config-custom`](../libs/eslint-config-custom).
- The shared Prettier configuration is located at the root [`.prettierrc.js](../.prettierrc.js) file.

## Testing

Front-end application should be tested with Cypress when possible.
We use Jest for unit tests.

## Deployment

Continuous integration is achieved using [GitHub Actions](https://docs.github.com/en/actions).
Workflows can be found in [`.github/workflows`](../.github/workflows).

Each of the app/service should have its own workflow `deploy_{app}.yml` file, with the notable exception of the `front`
and the `graphql` applications which share the `deploy_apps.yml` workflows.

Since we are using [Turborepo](https://turborepo.org), lint is performed before any application build, therefore a bad
linting lead to a deployment rejection.

## See also

- [Cloud architecture](cloud-architecture.md)
- [Workspace](workspace.md)
