import 'winston-daily-rotate-file';

import * as winston from 'winston';

import { getCtxMetadata } from './context';
import { cleanPackageName } from './utils';

const appName = cleanPackageName(
  process.env.APP_NAME || process.env.npm_package_name
);

const logFormat = (info: winston.LogEntry) => {
  const { level, message, ...metadata } = info;
  return {
    level,
    ...(appName && { app: appName }),
    message,
    ...metadata,
    ...getCtxMetadata()
  };
};

const isDev = process.env.NODE_ENV === 'development';

const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf((info) => JSON.stringify(logFormat(info), null, 2))
);

const transports: winston.transport[] = isDev
  ? [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.printf((info) => `[${info.level}] ${info.message}`)
        ),
        handleExceptions: true
      })
    ]
  : [
      new winston.transports.Console({
        level: 'error',
        format: jsonFormat
      }),
      new winston.transports.Console({
        level: 'info',
        format: jsonFormat
      })
    ];

export default winston.createLogger({
  transports,
  exitOnError: false
});
