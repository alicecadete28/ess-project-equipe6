import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import RoomService from '../../src/services/room.service';
import RoomRepository from '../../src/repositories/room.repository';
import ReservationRepository from '../../src/repositories/findReservation.repository';
import { buscarAcomodacoes } from '../../src/controllers/findReservation.controller';

import RoomEntity from '../../src/entities/room.entity';
import PjRepository from '../../src/repositories/pj.repository';
import { mock } from 'node:test';
import ReservationEntity from '../../src/entities/reservation.entity';
import FilterService from '../../src/services/filter.service';

describe('buscarAcomodacoes', () => {
  let service: FilterService;
  let error: any;
  let mockRoom: RoomEntity[];

  beforeEach(() => {
    service = new FilterService();
  });

  mockRoom = [
    new RoomEntity({
      id: '1',
      pj_id: 'PJ123',
      description: 'Quarto confortável',
      type: 'deluxe',
      price: 200,
      capacity: 2,
      caracteristics_ids: [],
      local: 'Recife',
      stars: 4.5,
      ar_condicionado: true,
      tv: true,
      wifi: true,
      petFriendly: true,
      cafeDaManha: true,
      estacionamento: true,
      avaliacao: 9.0,
    }),
    new RoomEntity({
      id: '1',
      pj_id: 'PJ123',
      description: 'Quarto confortável',
      type: 'deluxe',
      price: 200,
      capacity: 2,
      caracteristics_ids: [],
      local: 'Recife',
      stars: 4.5,
      ar_condicionado: true,
      tv: true,
      wifi: true,
      petFriendly: true,
      cafeDaManha: true,
      estacionamento: true,
      avaliacao: 9.0,
    }),
    new RoomEntity({
      id: '1',
      pj_id: 'PJ123',
      description: 'Quarto confortável',
      type: 'deluxe',
      price: 200,
      capacity: 2,
      caracteristics_ids: [],
      local: 'Recife',
      stars: 4.5,
      ar_condicionado: true,
      tv: true,
      wifi: true,
      petFriendly: true,
      cafeDaManha: true,
      estacionamento: false,
      avaliacao: 9.0,
    }),
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('deve retornar quartos que possuem wifi', async () => {
    const result = service.filtrarAcomodacoes(mockRoom, { wifi: true });

    expect(result).toEqual(mockRoom.filter((item) => item.wifi));
  });

  it('deve retornar quartos possuem tv e wifi', async () => {
    const result = service.filtrarAcomodacoes(mockRoom, {
      wifi: true,
      tv: true,
    });

    expect(result).toEqual(mockRoom.filter((item) => item.wifi && item.tv));
  });
});

//npx jest --verbose --config ./jest.config.js --detectOpenHandles tests/services/test.findReservationService.spec.ts

//ok
