import { User } from '@starter/core';
import { EntitySchema } from 'typeorm';

const UserSchema = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      type: 'text',
      primary: true
    },
    email: {
      type: 'text',
      name: 'email',
      unique: true
    },
    password: {
      type: 'text',
      name: 'password',
      select: false
    },
    name: {
      type: 'text',
      name: 'name',
      nullable: true
    },
    lastLogin: {
      type: 'timestamptz',
      name: 'last_login',
      nullable: true
    },
    lastLoginIP: {
      type: 'text',
      name: 'last_login_ip',
      nullable: true
    },
    dateCreated: {
      type: 'timestamptz',
      name: 'date_created'
    },
  }
});

export default UserSchema;
