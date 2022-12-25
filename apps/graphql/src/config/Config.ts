import type { z } from 'zod';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type schema from './schema';

/**
 * Simple alias to the config service, but with proper generic parameters.
 */
@Injectable()
export default class Config extends ConfigService<
  z.infer<typeof schema>,
  true
> {}
