import type { Request } from 'express';

export interface OutputContext {
  req?: Request;
  token?: string;
}
