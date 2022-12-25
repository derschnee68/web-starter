import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AuthGuard from './AuthGuard';
import JwtConfig from './JwtConfig';
import JwtStrategy from './JwtStrategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: ['jwt', 'token'] }),
    JwtModule.registerAsync({ useClass: JwtConfig }),
  ],
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [JwtModule],
})
export default class AuthModule {}
