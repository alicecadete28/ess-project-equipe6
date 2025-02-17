
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

export class AuthService {
  // Implementation of the interface properties
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pfRepository: PfRepository,
    private readonly pjRepository: PjRepository,
    private readonly emailService: EmailService
  ) {}
  
  // Implementation of the interface methods
  async login(email: string, password: string): Promise<string> {
    // Implementation
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    //const isValidPassword = User.isPasswordValid(password, user);

    //if (!isValidPassword) throw new Error('Senha inválida');

    const token = jwt.sign({ id: user.id, email }, Env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return token;
  }

  async register(
    data: { user: User; client: PFEntity | PJEntity },
    type: string
  ): Promise<void> {
    const exists = await this.userRepository.getUserByEmail(data.user.email);

    if (exists) throw new Error('Email já cadastrado');

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
