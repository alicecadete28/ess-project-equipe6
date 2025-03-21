// import { Request, Response } from 'express';
// import { parseISO } from 'date-fns';
// import RoomService from '../../src/services/room.service';
// import RoomRepository from '../../src/repositories/room.repository';
// import ReservationRepository from '../../src/repositories/findReservation.repository';
// import { buscarAcomodacoes } from '../../src/controllers/findReservation.controller';

// import RoomEntity from '../../src/entities/room.entity';
// import PjRepository from '../../src/repositories/pj.repository';
// import { mock } from 'node:test';

// describe('buscarAcomodacoes', () => {
//   let mockRoomRepository: RoomRepository;
//   let mockReservationRepository: ReservationRepository;
//   let mockPjRepository: PjRepository;

//   let service: RoomService;
//   let error: any;
//   let mockRoom: RoomEntity[];

//   beforeEach(() => {
//     mockRoomRepository = {
//       getRooms: jest.fn(),
//       getRoom: jest.fn(),
//       getRoomsByPj: jest.fn(),
//     } as any;

//     mockReservationRepository = {
//       getReservations: jest.fn(),
//       getReservation: jest.fn(),
//       getReservationsByPf: jest.fn(),
//     } as any;

//     mockPjRepository = {
//       getPjs: jest.fn(),
//       getPjById: jest.fn(),
//       getPjByCnpj: jest.fn(),
//       createPj: jest.fn(),
//       updatePj: jest.fn(),
//       deletePj: jest.fn,
//     } as any;

//     service = new RoomService(
//       mockRoomRepository,
//       mockPjRepository,
//       mockReservationRepository
//     );
//   });

//   mockRoom = [
//     new RoomEntity({
//       id: '1',
//       pj_id: 'PJ123',
//       description: 'Quarto confortável',
//       type: 'deluxe',
//       price: 200,
//       capacity: 2,
//       caracteristics_ids: [],
//       local: 'Recife, PE',
//       stars: 4.5,
//       ar_condicionado: true,
//       tv: true,
//       wifi: true,
//       petFriendly: true,
//       cafeDaManha: true,
//       estacionamento: true,
//       avaliacao: 9.0,
//     }),
//   ];

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it('deve retornar quartos disponíveis corretamente', async () => {
//     jest.spyOn(mockRoomRepository, 'getRooms').mockResolvedValue(mockRoom);
//     jest
//       .spyOn(mockReservationRepository, 'getReservations')
//       .mockResolvedValue([]);

//     const result = await service.buscarAcomodacoes(
//       'Recife',
//       parseISO('2025-06-01'),
//       parseISO('2025-06-10'),
//       2
//     );

//     expect(result).toEqual(mockRoom);
//   });

//   it('deve retornar no_rooms_found', async () => {
//     jest.spyOn(mockRoomRepository, 'getRooms').mockResolvedValue([]);
//     jest
//       .spyOn(mockReservationRepository, 'getReservations')
//       .mockResolvedValue([]);

//     const result = await service.buscarAcomodacoes(
//       'Recife',
//       parseISO('2025-06-01'),
//       parseISO('2025-06-10'),
//       2
//     );

//     expect(result).toEqual('no_rooms_found');
//   });

//   it('deve retornar no_capacity_available', async () => {
//     const mockReservation = [
//       {
//         id: '1',
//         pf_id: 'PF123',
//         room_id: '1',
//         check_in: parseISO('2025-06-05'),
//         check_out: parseISO('2025-06-10'),
//         guests: 2,
//         total: 200,
//         status: 'confirmed',
//         rating: { stars: 4.5, comment: 'Ótimo' },
//       },
//     ];

//     jest.spyOn(mockRoomRepository, 'getRooms').mockResolvedValue(mockRoom);
//     jest
//       .spyOn(mockReservationRepository, 'getReservations')
//       .mockResolvedValue(mockReservation);

//     const result = await service.buscarAcomodacoes(
//       'Recife',
//       parseISO('2025-06-01'),
//       parseISO('2025-06-10'),
//       2
//     );

//     expect(result).toEqual('no_capacity_available');
//   });
// });

// //npx jest --verbose --config ./jest.config.js --detectOpenHandles tests/services/test.findRoomService.spec.ts

// //nao esta funcionando
