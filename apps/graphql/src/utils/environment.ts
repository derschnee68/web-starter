type Environment = 'production' | 'development' | 'test';

export function environment() {
  let internal: Environment;

  switch (process.env.NODE_ENV) {
    case 'dev':
    case 'development':
      internal = 'development';
      break;
    case 'test':
      internal = 'test';
      break;
    default:
      internal = 'production';
      break;
  }

  return internal;
}

export function isEnvironment(expected: Environment): boolean {
  return environment() === expected;
}

export function isProduction() {
  return isEnvironment('production');
}
