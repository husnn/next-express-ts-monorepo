import bcrypt from 'bcryptjs';

export class User {
  id: string;
  email: string;
  password: string;
  name?: string;
  lastLogin?: Date;
  lastLoginIP?: string;
  dateCreated: Date;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10 || process.env.PASSWORD_SALT_ROUNDS);
  }

  static async verifyPassword(provided: string, actual: string) {
    return bcrypt.compare(provided, actual);
  }
}

export default User;
