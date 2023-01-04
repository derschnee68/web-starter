import { config } from 'dotenv';

export function envFiles() {
  const envs = ['.env'];

  switch (process.env.NODE_ENV) {
    case 'test':
      envs.push('.env.test');
      break;
    case 'dev':
    case 'development':
      envs.push('.env.development');
      break;
    default:
      envs.push('.env.production');
      break;
  }

  return [...envs, ...envs.map((e) => `${e}.local`)];
}

export function loadEnv() {
  for (const file of envFiles()) {
    config({ path: file, override: true });
  }
}
