import { NextFunction, Request, Response, Router } from 'express';

import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import authMiddleware from '../middleware/authMiddleware';
import initAuthRouter from './auth.routes';

export default function init(
  router: Router,
  authController: AuthController,
  userController: UserController
) {
  router.use('/auth', initAuthRouter(authController));

  router.get(
    '/user-info',
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      userController.getUserInfo(req, res, next)
  );
}
