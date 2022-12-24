# Workspace

## Architecture

This repository is a monorepo which take advantage of the [pnpm workspaces](https://pnpm.io/workspaces) and uses
[Turborepo](https://turborepo.org) to manage the builds.

The file system architecture is the following:

- [`apps/`](../apps) contains the end applications, meant to be deployed and exposed to the end users
  - [`front/`](../apps/front) the application front-end, based on [Next.js](https://nextjs.org/)
  - [`graphql/`](../apps/graphql) the GraphQL API, based on the [Nest.js](https://nestjs.com/) framework
- [`docs/`](../docs) *you are here!* - the developer documentation of the project
- [`libs/`](../libs) internal workspace packages that might be published on the npm registry
  - [`eslint-config-custom/`](../libs/eslint-config-custom) the global shared ESLint configuration

## See also

- [Continuous integration](continuous-integration.md)
