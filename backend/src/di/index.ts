import OtherRepository from '../repositories/other.repository';
import RoomRepository from '../repositories/room.repository';
import TestRepository from '../repositories/test.repository';
import RoomService from '../services/room.service';
import TestService from '../services/test.service';
import Injector from './injector';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());

//Room
di.registerRepository(RoomRepository, new RoomRepository());

di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);

di.registerService(
  RoomService,
  new RoomService(di.getRepository(RoomRepository))
);
