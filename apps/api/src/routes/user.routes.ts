import { Router } from 'express';
import UserController from '../controllers/UserController';

export default function init(userController: UserController): Router {
  const router = Router();

  return router;
}
