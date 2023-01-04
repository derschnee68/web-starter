# Web starter

This repo is a boilerplate for bootstrapping a NextJs front and NestJs backend
using [Typescript](https://www.typescriptlang.org/).

## Summary

- [What's inside ?](#whats-inside)
- [How to install ?](#how-to-install-)
- [Maintainers - Core team](#maintainers---core-team)

## What's inside?

### `./apps` folder

The project is a monorepo managed by [pnpm](https://pnpm.io/) and [turbo](https://turbo.build/) and containing
in `./apps` folder:

- a [NestJs](https://nestjs.com/) backend with
    * [Graphql](https://docs.nestjs.com/graphql/quick-start)
    * [MikroOrm](https://mikro-orm.io/) on top of a mysql database
    * [JWT authentication](https://docs.nestjs.com/security/authentication)
    * e2e testing with [Jest](https://jestjs.io/)
    * [Error reporting](https://sentry.io)
- a [NextJs](https://nextjs.org/) frontend with
    * [MaterialUI](https://mui.com/material-ui/getting-started/overview/)
    * Form validation via [react-hook-form](https://react-hook-form.com/) and [zod](https://github.com/colinhacks/zod)
    * auth pages (signin, signup, forgot-password, reset-password pages)
    * e2e testing via [Cypress](https://www.cypress.io/)
    * unit testing with [Jest](https://jestjs.io/)
- a [docusaurus](https://docusaurus.io/) documentation
- a CLI that generates icons and JWT keypairs for the frontend

It also contains in `./.github` folder a github action pipeline to test and build on dev branch and pull requests.

### Documentation

[More documentation](./docs/workspace.md) is available to describe the architecture and github workflow.

## How to install ?

First install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) globally on your machine, then run

`pnpm install`

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

Then, you can navigate to https://localhost:3000 and login with email `user1@mywebsite.ai` and password `123456`.

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
