import type { Request } from 'express';
import type { Context as GraphQLWSContext } from 'graphql-ws';

export interface HTTPContext {
  req: Request;
}

export type WSContext = GraphQLWSContext<{
  authorization?: string;
  Authorization?: string;
}>;

export type InputContext = WSContext | HTTPContext;

export interface OutputContext {
  req?: Request;
  token?: string;
}
