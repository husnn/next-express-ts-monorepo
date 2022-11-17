import AuthController from '../controllers/AuthController';
import { Router } from 'express';
import initAuthRouter from './auth.routes';

export default function init(router: Router, authController: AuthController) {
  router.use('/auth', initAuthRouter(authController));
}
