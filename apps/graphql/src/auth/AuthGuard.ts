import type { Request } from 'express';
import set from 'lodash/set';
import type { Observable } from 'rxjs';
import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { GqlContextType } from '@nestjs/graphql';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { IAuthGuard } from '@nestjs/passport';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import type { OutputContext } from '../types/context';
import { IS_PUBLIC_KEY } from './Public';

@Injectable()
export default class AuthGuard
  extends NestAuthGuard(['jwt', 'token'])
  implements IAuthGuard
{
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * @param {ExecutionContext} context
   * @return {any}
   */
  getRequest(context: ExecutionContext): Request | undefined {
    switch (context.getType<GqlContextType>()) {
      case 'graphql':
        const ctx =
          GqlExecutionContext.create(context).getContext<OutputContext>();

        if (ctx.token) {
          set(ctx, 'req.headers.authorization', ctx.token);
        }

        return ctx.req;
      case 'http':
        return context.switchToHttp().getRequest<Request>();
    }
  }

  /**
   * Skip the guard if the route/query/mutation/subscription is marked as public with the {@see IS_PUBLIC_KEY} decorator.
   * @see https://docs.nestjs.com/security/authentication#enable-authentication-globally
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
