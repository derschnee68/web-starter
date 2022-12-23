# Workspace

## Architecture

This repository is a monorepo which take advantage of the [pnpm workspaces](https://pnpm.io/workspaces) and uses
[Turborepo](https://turborepo.org) to manage the builds.

The file system architecture is the following:

- [`apps/`](../apps) contains the end applications, meant to be deployed and exposed to the end users
  - [`front/`](../apps/front) the application front-end, based on [Next.js](https://nextjs.org/)
  - [`graphql/`](../apps/graphql) the GraphQL API, based on the [Nest.js](https://nestjs.com/) framework
- [`docs/`](../docs) *you are here!* - the developer documentation of teh project
- [`examples/`](../examples) examples models to use with the `i2` cli
- [`libs/`](../libs) internal workspace packages that might be published on the npm registry
  - [`avenir-font-face/`](../libs/avenir-font-face) the Avenir font `@squarefactory/avenir-font-face` package used by the front-end applications
  - [`eslint-config-isquare/`](../libs/eslint-config-isquare) the global shared isquare ESLint configuration
- [`services/`](../services) contains the non-Javascript service applications - they are mostly deployed on Google Cloud as services containers. See the relevant documentation for more details.

## See also

- [Cloud architecture](cloud-architecture.md)
- [Continuous integration](continuous-integration.md)
