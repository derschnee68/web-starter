import * as process from 'process';
import type { Options } from '@mikro-orm/core';
import { loadEnv } from '../config/dotenv';
import schema from '../config/schema';
import NotFound from '../errors/NotFound';
import MikroORMLogger from '../logging/MikroORMLogger';
import User from './entities/User';

loadEnv();
const env = schema.pick({ MYSQL_URI: true }).parse(process.env);

console.log('juju', env.MYSQL_URI);
const config: Options = {
  debug: true,
  type: 'mysql',
  clientUrl: env.MYSQL_URI,
  entities: [User],
  migrations: {
    pathTs: './src/database/migrations',
    path: './dist/database/migrations',
    tableName: 'migrations',
  },
  seeder: {
    pathTs: './src/database/seeders',
    path: './dist/database/seeders',
  },
  findOneOrFailHandler: (entityName) => {
    return new NotFound(`${entityName} not found`);
  },
  loggerFactory: (options) => new MikroORMLogger(options),
};

export default config;
