import { EntitySchema } from 'typeorm';
import { User } from '@app/core';

const UserSchema = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      type: 'text',
      primary: true
    },
    dateCreated: {
      type: 'timestamp',
      name: 'date_created',
      createDate: true
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
    firstName: {
      type: 'text',
      name: 'first_name',
      nullable: true
    },
    lastName: {
      type: 'text',
      name: 'last_name',
      nullable: true
    },
    lastLogin: {
      type: 'timestamp',
      name: 'last_login',
      nullable: true
    },
    lastLoginIP: {
      type: 'text',
      name: 'last_login_ip',
      nullable: true
    },
    preferences: {
      type: 'simple-json',
      nullable: true
    }
  }
});

export default UserSchema;
