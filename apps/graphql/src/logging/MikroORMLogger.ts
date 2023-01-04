import type { Logger } from 'tslog';
import type {
  LogContext,
  Logger as ILogger,
  LoggerNamespace,
  LoggerOptions,
} from '@mikro-orm/core';
import globalLogger from './globalLogger';

export default class MikroORMLogger implements ILogger {
  private readonly loggers: Record<LoggerNamespace, Logger | undefined> = {
    'query-params': undefined,
    discovery: undefined,
    info: undefined,
    query: undefined,
    schema: undefined,
  };

  constructor(options: LoggerOptions) {
    if (options.debugMode) {
      this.setDebugMode(options.debugMode);
    }
  }

  isEnabled(namespace: LoggerNamespace): boolean {
    return !!this.loggers[namespace];
  }

  setDebugMode(debugMode: boolean | LoggerNamespace[]): void {
    const enable: LoggerNamespace[] = [];

    if (debugMode === true) {
      enable.push('query-params', 'discovery', 'info', 'query', 'schema');
    } else if (Array.isArray(debugMode)) {
      enable.push(...debugMode);
    }

    for (const namespace of enable) {
      this.loggers[namespace] = globalLogger.getChildLogger({
        name: `mikro/${namespace}`,
      });
    }
  }

  logQuery(context: LogContext): void {
    this.loggers.query?.debug(context);
  }

  log(namespace: LoggerNamespace, message: string, context?: LogContext): void {
    if (context) {
      this.loggers?.[namespace]?.debug(message, context);
    } else {
      this.loggers?.[namespace]?.debug(message);
    }
  }

  warn(
    namespace: LoggerNamespace,
    message: string,
    context?: LogContext,
  ): void {
    if (context) {
      this.loggers?.[namespace]?.warn(message, context);
    } else {
      this.loggers?.[namespace]?.warn(message);
    }
  }

  error(
    namespace: LoggerNamespace,
    message: string,
    context?: LogContext,
  ): void {
    if (context) {
      this.loggers?.[namespace]?.error(message, context);
    } else {
      this.loggers?.[namespace]?.error(message);
    }
  }
}
