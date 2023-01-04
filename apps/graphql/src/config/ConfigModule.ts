import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import patchEnv from '../utils/patchEnv';
import Config from './Config';
import { envFiles } from './dotenv';
import schema from './schema';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: envFiles().reverse(),
      validate: (config) => schema.parse(patchEnv(config)),
    }),
  ],
  providers: [Config],
  exports: [Config],
})
export default class ConfigModule {}
