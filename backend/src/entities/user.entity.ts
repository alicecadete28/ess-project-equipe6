import BaseEntity from './base.entity';
export default class UserEntity extends BaseEntity {
  email: string;
  password: string;
  type: string;

  constructor(data: UserEntity) {
    super(data.id || '');
    this.email = data.email;
    this.password = data.password;
    this.type = data.type;
  }

  static isPasswordValid(plainPassword: string, user: UserEntity): boolean {
    return plainPassword === user.password;
  }
}
