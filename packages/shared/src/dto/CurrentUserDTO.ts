import { assignIfNotNull } from './utils';

export class CurrentUserDTO {
  id?: string;
  email?: string;
  name?: string;

  constructor(data: Partial<CurrentUserDTO>) {
    this.id = data.id;
    this.email = data.email;
    assignIfNotNull<CurrentUserDTO>(this, data, 'name');
  }
}

export default CurrentUserDTO;
