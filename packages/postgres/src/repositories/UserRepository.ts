import { UserRepository as IUserRepository, User } from '@app/core';

import Repository from './Repository';
import UserSchema from '../schemas/UserSchema';

export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  constructor() {
    super(UserSchema);
  }

  findByEmail(
    email: string,
    opts: {
      select?: Array<keyof User>;
    }
  ): Promise<User> {
    const query = this.db
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    if (opts?.select) {
      query.addSelect(opts.select.map((property) => `user.${property}`));
    }

    return query.getOne();
  }
}

export default UserRepository;
