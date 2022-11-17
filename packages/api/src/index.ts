import { RedisClientType, createClient } from 'redis';

import App from './App';
import Postgres from '@app/postgres';
import config from './config';
import logger from '@app/logger';

(async () => {
  try {
    await Postgres.init();
    logger.info('Connected to database.');

    const redisClient: RedisClientType = createClient({
      url: config.redis.url,
      legacyMode: true
    });
    await redisClient.connect();
    logger.info('Connected to Redis.');

    new App(redisClient).start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
