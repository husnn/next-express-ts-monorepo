import { UserService } from '@app/core';

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
}

export default UserController;
