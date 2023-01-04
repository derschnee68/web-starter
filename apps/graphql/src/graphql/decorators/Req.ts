import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

const Req = createParamDecorator(
  (data: unknown, execution: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(execution).getContext<{
      req: Request;
    }>();
    return ctx.req;
  },
);

export default Req;
