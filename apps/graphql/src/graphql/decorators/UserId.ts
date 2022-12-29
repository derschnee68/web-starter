import type { Request } from 'express';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Extract the user id from the GraphQL context.
 * @see {@link https://docs.nestjs.com/graphql/other-features#custom-decorators}
 */
const UserId = createParamDecorator((data: unknown, execution: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(execution).getContext<{ req: Request & { user?: string | undefined } }>();
  return ctx.req.user;
});

export default UserId;
