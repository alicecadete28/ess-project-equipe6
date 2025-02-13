import PfRepository from '../repositories/pf.repository';
import PjRepository from '../repositories/pj.repository';
import UserRepository from '../repositories/user.repository';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import Injector from './injector';

export const di = new Injector();

di.registerRepository(UserRepository, new UserRepository());
di.registerService(EmailService, new EmailService());
di.registerRepository(PjRepository, new PjRepository());
di.registerRepository(PfRepository, new PfRepository());

di.registerService(
  AuthService,
  new AuthService(
    di.getRepository(UserRepository),
    di.getRepository(PfRepository),
    di.getRepository(PjRepository),
    di.getService(EmailService)
  )
);
