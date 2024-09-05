import express, {
  Application,
  Router
} from 'express';

import { AuthService, UserService } from '@starter/core';
import logger from '@starter/logger';
import {
  UserRepository
} from '@starter/postgres';
import { authCookieName } from '@starter/shared';
import cors from 'cors';
import session from 'express-session';
import { RedisClientType } from 'redis';
import config from './config';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import errorHandler from './middleware/errorHandler';
import requestLogger from './middleware/requestLogger';
import initRoutes from './routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const connectRedis = require('connect-redis')(session);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const connectSQLite = require('connect-sqlite3')(session);

class App {
  app: Application;

  constructor(redis?: RedisClientType) {
    const app: Application = express();

    const userRepository = new UserRepository();

    const authService = new AuthService(userRepository);
    const userService = new UserService(userRepository);

    const authController = new AuthController(authService);
    const userController = new UserController(userService);

    app.set('trust proxy', true);

    app.use(
      cors({
        origin: new URL(config.app.clientUrl).origin,
        credentials: true,
        maxAge: 86400
      })
    );

    let store = new connectSQLite({
      db: 'sessions.sqlite'
    });

    if (redis) {
      store = new connectRedis({
        client: redis
      });

      logger.info('Using Redis for session storage.');
    }

    app.use(
      session({
        name: authCookieName,
        secret: config.auth.secret,
        store,
        resave: false,
        saveUninitialized: false,
        cookie: {
          sameSite: config.app.isSecure ? 'none' : 'lax',
          secure: config.app.isSecure,
          maxAge: config.auth.expiry
        }
      })
    );

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.disable('x-powered-by');

    app.get('/health', (req, res) => {
      res.status(200).send('Ok');
    });

    app.use(requestLogger);

    const router = Router();
    initRoutes(
      router,
      authController,
      userController
    );

    app.use('/v1', router);

    app.use(errorHandler);

    this.app = app;
  }

  getInstance = (): Application => this.app;

  onError(err: string) {
    logger.error(`Could not start app. ${err}`);
  }

  start() {
    const { protocol, host, port } = config.app;

    this.app
      .listen(port, host, () => {
        logger.info(`App running at ${protocol}://${host}:${port}`);
      })
      .on('error', this.onError);
  }
}

export default App;
