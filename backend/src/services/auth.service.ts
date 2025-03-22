import User from '../entities/user.entity';
import jwt from 'jsonwebtoken';
import { EmailService } from './email.service';
import UserRepository from '../repositories/user.repository';
import { JwtPayload } from '../utils/types';
import Env from '../env';
import PFEntity from '../entities/pf.entity';
import PJEntity from '../entities/pj.entity';
import PfRepository from '../repositories/pf.repository';
import PjRepository from '../repositories/pj.repository';
import {
  HttpBadRequestError,
  HttpNotFoundError,
  HttpUnauthorizedError,
} from '../utils/errors/http.error';

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pfRepository: PfRepository,
    private readonly pjRepository: PjRepository
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new HttpNotFoundError({
        msg: 'Usuário não encontrado',
        msgCode: 'user_not_found',
      });
    }

    const isValidPassword = User.isPasswordValid(password, user);

    if (!isValidPassword)
      throw new HttpUnauthorizedError({
        msg: 'Senha inválida',
        msgCode: 'invalid_password',
      });

    const client =
      user.type === 'pf'
        ? await this.pfRepository.getPfByUserId(user.id)
        : await this.pjRepository.getPjByUserId(user.id);

    const token = jwt.sign(
      { id: user.id, email, type: user.type, client },
      Env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return token;
  }

  async register(
    data: { user: User; client: PFEntity | PJEntity },
    type: string
  ): Promise<void> {
    const exists = await this.userRepository.getUserByEmail(data.user.email);

    if (exists)
      throw new HttpBadRequestError({
        msg: 'Email já cadastrado',
        msgCode: 'email_already_registered',
      });

    const user = await this.userRepository.createUser({
      ...data.user,
      type,
    } as User);

    if (type === 'pf') {
      await this.pfRepository.createPf({
        ...data.client,
        user_id: user.id,
      } as PFEntity);
    } else {
      await this.pjRepository.createPj({
        ...data.client,
        user_id: user.id,
      } as PJEntity);
    }
  }

  static validateToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, Env.JWT_SECRET) as JwtPayload;

      return decoded;
    } catch {
      throw new Error('Token inválido ou expirado');
    }
  }
}
