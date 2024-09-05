import logger, { getContext, setCtxMetadata } from '@starter/logger';
import { NextFunction, Request, Response } from 'express';

import { nanoid } from 'nanoid';

export default (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  const meta: any = {
    reqId: nanoid(),
    method: req.method,
    url: req.originalUrl,
    origin: req.ip
  };

  if (req.session.user) meta.userId = req.session.user;

  let duration: number;

  res.on('finish', () => {
    duration = calcDurationMs(start);
  });

  res.on('close', () => {
    logger.info(
      `[${res.statusCode}] ${req.method} ${
        req.originalUrl
      } - ${duration.toLocaleString()} ms`,
      {
        status: res.statusCode
      }
    );
  });

  getContext().run(() => {
    setCtxMetadata(meta);
    next();
  });
};

const calcDurationMs = (start: [number, number]) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
