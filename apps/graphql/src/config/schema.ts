import { z } from 'zod';

const escape = (raw: string) => raw.replace(/\\\n/g, '\n');
const schema = z.object({
  APP_ENDPOINT: z.string().url(),
  APP_URI: z.string().url(),
  APP_SECRET: z.string().min(32),

  LOG_LEVEL: z
    .enum(['silly', 'trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    .default('info'),

  JWT_PUBLIC_KEY: z.string().nonempty().transform(escape),
  JWT_PRIVATE_KEY: z.string().nonempty().transform(escape),

  MYSQL_URI: z.string().url(),

  SMTP_URI: z.string().nonempty(),
});

export default schema;
