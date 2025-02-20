import PfRepository from '../repositories/pf.repository';
import PjRepository from '../repositories/pj.repository';
import UserRepository from '../repositories/user.repository';
//import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import RoomRepository from '../repositories/room.repository';
import RoomService from '../services/room.service';
import Injector from './injector';
import FavoriteService from '../services/favorite.service';
import SavedService from '../services/saved.service';
import ReservationRepository from '../repositories/reservation.repository'; // Import the ReservationRepository

export const di = new Injector();

di.registerRepository(UserRepository, new UserRepository());
di.registerService(EmailService, new EmailService());
di.registerRepository(PjRepository, new PjRepository());
di.registerRepository(PfRepository, new PfRepository());
di.registerRepository(ReservationRepository, new ReservationRepository()); // Register the ReservationRepository

//Room
di.registerRepository(RoomRepository, new RoomRepository());
di.registerRepository(ReservationRepository, new ReservationRepository());

// di.registerService(
//   AuthService,
//   new AuthService(
//     di.getRepository(UserRepository),
//     di.getRepository(PfRepository),
//     di.getRepository(PjRepository),
//     di.getService(EmailService)
//   )
// );

di.registerService(
  RoomService,
  new RoomService(
    di.getRepository(RoomRepository),
    di.getRepository(PjRepository)
  )
);
di.registerRepository(PfRepository, new PfRepository());
di.registerService(
  FavoriteService,
  new FavoriteService(di.getRepository(PfRepository))
);
di.registerService(
  SavedService,
  new SavedService(di.getRepository(PfRepository))
);
