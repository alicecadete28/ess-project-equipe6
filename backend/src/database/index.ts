import PFEntity from '../entities/pf.entity';
import ReservationEntity from '../entities/reservation.entity';
import RoomEntity from '../entities/room.entity';

export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  private constructor() {
    this.data = {};
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static reset() {
    Database.instance = new Database();
  }

  static seed() {
    Database.getInstance().data = {
      reservations: [
        new ReservationEntity({
          id: '1',
          pf_id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1b',
          room_id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c',
          check_in: new Date('2025-03-09'),
          check_out: new Date('2025-03-29'),
          guests: 2,
          total: 100,
          status: 'Pending',
          rating: { stars: 0, comment: '' },
        }),
      ],
      rooms: [
        new RoomEntity({
          id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c',
          pj_id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d',
          description: 'Room Seed',
          price: 100,
          type: 'Seed',
          capacity: 2,
          caracteristics_ids: ['Seed'],
          local: 'Recife',
          stars: 5,
          ar_condicionado: true,
          tv: true,
          wifi: false,
          petFriendly: true,
          cafeDaManha: true,
          estacionamento: true,
          avaliacao: 5,
        }),
        new RoomEntity({
          id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a',
          pj_id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1b',
          description: 'Room 2',
          price: 100,
          type: 'Seed',
          capacity: 2,
          caracteristics_ids: ['Seed'],
          local: 'Recife',
          stars: 5,
          ar_condicionado: true,
          tv: true,
          wifi: false,
          petFriendly: true,
          cafeDaManha: true,
          estacionamento: true,
          avaliacao: 5,
        }),
        new RoomEntity({
          id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1e',
          pj_id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1b',
          description: 'Room 3',
          price: 100,
          type: 'Seed',
          capacity: 2,
          caracteristics_ids: ['Seed'],
          local: 'Recife',
          stars: 5,
          ar_condicionado: true,
          tv: true,
          wifi: false,
          petFriendly: true,
          cafeDaManha: true,
          estacionamento: true,
          avaliacao: 5,
        }),
      ],
      tests: [
        // new TestEntity({
        //   id: '89ecc32a-aec7-4b71-adfd-03287e4ca74f',
        //   name: 'Test Seed',
        //   cpf: '8888',
        // }),
      ],
      pfs: [
        new PFEntity({
          id: '12732',
          user_id: '1',
          name: 'bia',
          birth_date: new Date(2000, 0, 9),
          cpf: '28173891',
          phone: '98171-2882',
          favorites: ['12', '22', '32'],
          savedRooms: ['12', '222', '32'],
        }),
      ],
      // tests: [
      //   new TestEntity({
      //     id: '89ecc32a-aec7-4b71-adfd-03287e4ca74f',
      //     name: 'Test Seed',
      //     cpf: '8888',
      //   }),
      //],
    };
  }
}
