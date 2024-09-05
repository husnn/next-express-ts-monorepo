import { UserService } from '@starter/core';
import {
  CurrentUserDTO,
  GetUserInfoResponse
} from '@starter/shared';
import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../http';

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const userResult = await this.userService.getUser(req.session.user);
      if (!userResult.success) throw new Error('Could not get user.');

      return new HttpResponse<GetUserInfoResponse>(res, {
        user: new CurrentUserDTO(userResult.data),
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
