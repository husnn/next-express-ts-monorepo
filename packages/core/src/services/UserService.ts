import { Result } from '@starter/shared';
import { User } from '../entities';
import { UserRepository } from '../repositories';

export class UserService {
  private userRepository: UserRepository;

  constructor(
    userRepository: UserRepository,
  ) {
    this.userRepository = userRepository;
  }

  async getUser(userId: string): Promise<Result<User>> {
    const user = await this.userRepository.get(userId);
    if (!user) {
      return Result.fail(null, 'User not found');
    }

    return Result.ok(user);
  }
}

export default UserService;
