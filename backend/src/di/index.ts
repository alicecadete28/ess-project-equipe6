import PfRepository from '../repositories/pf.repository';
import PjRepository from '../repositories/pj.repository';
import UserRepository from '../repositories/user.repository';
import RoomRepository from '../repositories/room.repository';
import RoomService from '../services/room.service';
import Injector from './injector';
import FavoriteService from '../services/favorite.service';
import SavedService from '../services/saved.service';
import ReservationRepository from '../repositories/reservation.repository'; // Import the ReservationRepository
import FindReservationRepository from '../repositories/findReservation.repository';
import AvaliationService from '../services/avaliation.service';
import ReservationService from '../services/reservation.service';
import { AuthService } from '../services/auth.service';
import FilterService from '../services/filter.service';

export const di = new Injector();

di.registerRepository(UserRepository, new UserRepository());
di.registerRepository(PjRepository, new PjRepository());
di.registerRepository(PfRepository, new PfRepository());
di.registerRepository(ReservationRepository, new ReservationRepository()); // Register the ReservationRepository
di.registerRepository(RoomRepository, new RoomRepository());
di.registerRepository(ReservationRepository, new ReservationRepository());
di.registerRepository(
  FindReservationRepository,
  new FindReservationRepository()
); // Register the FindReservationRepository
//Room

di.registerService(
  AuthService,
  new AuthService(
    di.getRepository(UserRepository),
    di.getRepository(PfRepository),
    di.getRepository(PjRepository)
  )
);

di.registerService(
  RoomService,
  new RoomService(
    di.getRepository(RoomRepository),
    di.getRepository(PjRepository),
    di.getRepository(ReservationRepository)
  )
);
di.registerService(
  FavoriteService,
  new FavoriteService(di.getRepository(PfRepository))
);
di.registerService(
  SavedService,
  new SavedService(di.getRepository(PfRepository))
);

di.registerService(
  AvaliationService,
  new AvaliationService(di.getRepository(ReservationRepository))
);

di.registerService(
  ReservationService,
  new ReservationService(di.getRepository(ReservationRepository))
);

di.registerService(FilterService, new FilterService());
