import { assignIfNotNull } from './utils';

export class CurrentUserDTO {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;

  constructor(data: Partial<CurrentUserDTO>) {
    this.id = data.id;
    assignIfNotNull<CurrentUserDTO>(this, data, 'firstName');
    assignIfNotNull<CurrentUserDTO>(this, data, 'lastName');
    this.email = data.email;
  }
}

export default CurrentUserDTO;
