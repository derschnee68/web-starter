import { Injectable } from '@nestjs/common';
import type { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import Config from '../config/Config';

@Injectable()
export default class JwtConfig implements JwtOptionsFactory {
  constructor(private readonly config: Config) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      publicKey: this.config.get('JWT_PUBLIC_KEY'),
      privateKey: this.config.get('JWT_PRIVATE_KEY'),
      signOptions: {
        algorithm: 'ES512',
      },
      verifyOptions: {
        algorithms: ['ES512'],
      },
    };
  }
}
