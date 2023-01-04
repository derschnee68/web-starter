import type { TLogLevelName } from 'tslog';
import { Logger } from 'tslog';
import { isProduction } from '../utils/environment';

const globalLogger = new Logger({
  minLevel: (process.env.LOG_LEVEL as TLogLevelName) ?? 'info',
  type: isProduction() ? 'hidden' : 'pretty',
  displayFilePath: 'hidden',
  displayFunctionName: false,
  attachedTransports: isProduction()
    ? // TODO change this logger (see i2)
      [] // ? [{ minLevel: 'silly', transportLogger: new GoogleCloudLogger() }]
    : [],
});

export default globalLogger;
