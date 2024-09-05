export class UserDTO {
  id: string;

  constructor(data: Partial<UserDTO> & { id: string }) {
    this.id = data.id;
  }
}

export default UserDTO;
