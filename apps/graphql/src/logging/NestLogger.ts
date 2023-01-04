import type { TLogLevelName } from 'tslog/dist/types/interfaces';
import type { LoggerService, LogLevel } from '@nestjs/common';
import globalLogger from './globalLogger';

const LEVEL_MAPPINGS: Record<LogLevel, TLogLevelName> = {
  debug: 'debug',
  error: 'error',
  log: 'info',
  verbose: 'silly',
  warn: 'warn',
};

export class NestLogger implements LoggerService {
  private readonly logger = globalLogger.getChildLogger({
    name: 'nest',
    ignoreStackLevels: 6,
  });

  private static parse(message: unknown, ...optionalParams: unknown[]) {
    if (typeof message === 'string' && typeof optionalParams[0] === 'string') {
      const scope = optionalParams.shift() as string;
      return [`[${scope}] ${message}`, ...optionalParams];
    }

    return [message, ...optionalParams];
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    return this.logger.silly(...NestLogger.parse(message, ...optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    return this.logger.debug(...NestLogger.parse(message, ...optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    return this.logger.warn(...NestLogger.parse(message, ...optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    return this.logger.error(...NestLogger.parse(message, ...optionalParams));
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    return this.logger.info(...NestLogger.parse(message, ...optionalParams));
  }

  setLogLevels(levels: LogLevel[]): void {
    const converted = levels.reduce((m, input) => {
      m.push(LEVEL_MAPPINGS[input]);
      return m;
    }, [] as TLogLevelName[]);

    let minLevel: TLogLevelName;

    if (converted.includes('silly')) {
      minLevel = 'silly';
    } else if (converted.includes('trace')) {
      minLevel = 'trace';
    } else if (converted.includes('debug')) {
      minLevel = 'debug';
    } else if (converted.includes('info')) {
      minLevel = 'info';
    } else if (converted.includes('warn')) {
      minLevel = 'warn';
    } else if (converted.includes('error')) {
      minLevel = 'error';
    } else {
      minLevel = 'fatal';
    }

    this.logger.setSettings({
      minLevel,
    });
  }
}
