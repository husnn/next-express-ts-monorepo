import 'winston-daily-rotate-file';

import * as winston from 'winston';

import appRoot from 'app-root-path';
import { cleanPackageName } from './utils';
import { getCtxMetadata } from './context';

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

let transports: winston.transport[] = [];

const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf((info) => JSON.stringify(logFormat(info), null, 2))
);

const rotationFileConfig = {
  format: jsonFormat,
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
};

transports = [
  new winston.transports.DailyRotateFile({
    ...rotationFileConfig,
    filename: `${appRoot}/logs/info-%DATE%.log`,
    level: 'info'
  }),
  new winston.transports.DailyRotateFile({
    ...rotationFileConfig,
    filename: `${appRoot}/logs/error-%DATE%.log`,
    level: 'error'
  })
];

if (isDev) {
  transports.push(
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => `[${info.level}] ${info.message}`)
      ),
      handleExceptions: true
    })
  );
}

export default winston.createLogger({
  transports,
  exitOnError: false
});
