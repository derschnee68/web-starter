# Web starter

This repo is a boilerplate for bootstrapping a front and backend using typescript, leveraging:

- an official pnpm starter turborepo
- a mysql database setup via docker
- a github action workflow

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `graphql`: a [NestJs](https://nestjs.com) backend using graphql
- `front`: a [Next.js](https://nextjs.org/) frontend
- `docs`: the app documentation
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Documentation

[More documentation](./docs/workspace.md) is available to describe the architecture and github workflow.

### First install

Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) globally.

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

## Maintainers - Core Team

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/derschnee68">
        <img src="https://avatars.githubusercontent.com/u/12176105?v=3?s=150" width="150px;" alt="Julien Schneider"/>
        <br />
        <b>Julien Schneider</b>
      </a>
    </td>
  </tr>
</table>
