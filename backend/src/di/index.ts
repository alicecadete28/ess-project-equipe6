import OtherRepository from '../repositories/other.repository';
import TestRepository from '../repositories/test.repository';
import TestService from '../services/test.service';
import ReservationRepository from '../repositories/reservation.repository'; // Import the ReservationRepository
import Injector from './injector';

export const di = new Injector();

// Register repositories
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerRepository(ReservationRepository, new ReservationRepository()); // Register the ReservationRepository

// Register services
di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);