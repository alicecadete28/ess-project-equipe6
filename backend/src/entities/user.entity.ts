import BaseEntity from './base.entity';

export default class UserEntity extends BaseEntity {
  email: string;
  password: string;
  type: string;
  constructor(data: UserEntity) {
    super(data.id || '');
    this.email = data.email;
    this.password = data.password;
  }

  static isPasswordValid(password: string, user: UserEntity) {
    return password === user.password;
  }
}
