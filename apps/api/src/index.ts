import logger from '@starter/logger';
import Postgres from '@starter/postgres';
import App from './App';

(async () => {
  try {
    await Postgres.init();
    logger.info('Connected to database.');

    new App().start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
