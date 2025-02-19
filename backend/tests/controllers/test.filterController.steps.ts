// import { loadFeature, defineFeature } from 'jest-cucumber';
// import supertest from 'supertest';
// import app from '../../src/app';
// import { di } from '../../src/di';
// import RoomRepository from '../../src/repositories/room.repository';
// import RoomEntity from '../../src/entities/room.entity';

// const feature = loadFeature('tests/features/filter-controller.feature');
// const request = supertest(app);

// defineFeature(feature, (test) => {
//   let mockRoomRepository: RoomRepository;
//   let response: supertest.Response;

//   beforeEach(() => {
//     mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
//   });

//   test('Acomodações com Wi-Fi disponíveis', ({ given, when, then, and }) => {
//     given(
//       /^o RoomRepository possui acomodações disponíveis em "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/, 
//       async () => {
//       }
//     );

//     and('algumas acomodações possuem Wi-Fi como comodidade', () => {});

//     when(/^uma requisição GET for enviada para "(.*)"$/, async (url, table) => {
//       response = await request.get(url);
//       console.log(response.body);
//     });

//     then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
//       expect(response.status).toBe(parseInt(statusCode, 10));
//     });

//     and(/^a resposta deve ter um JSON com uma lista de acomodações que possuem Wi-Fi$/, () => {
//       expect(response.body.every((room: any) => room.wifi)).toBe(true);
//     });

//     and(/^a acomodação com id "(.*)" e nome "(.*)" com Wi-Fi está na lista$/, (table) => {
//       const expectedRooms = table.hashes();
//       expectedRooms.forEach((expectedRoom: any) => {
//         expect(response.body).toEqual(expect.arrayContaining([expectedRoom]));
//       });
//     });

//     and('a resposta não deve conter acomodações sem Wi-Fi', () => {
//       expect(response.body.some((room: any) => !room.wifi)).toBe(false);
//     });
//   });

//   test('Acomodações com café da manhã disponíveis', ({ given, when, then, and }) => {
//     given(
//       /^o RoomRepository possui acomodações disponíveis em "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/, 
//       async () => {
//         const room = await mockRoomRepository.getRooms();

//         if (!room.filter((room) => room.cafeDaManha).length) {
//           const mockUserEntity = new RoomEntity({
//             id: '101',
//             pj_id: 'PJ123',
//             description: 'Hotel Recife',
//             type: 'deluxe',
//             price: 250,
//             capacity: 2,
//             caracteristics_ids: [],
//             local: 'Recife',
//             stars: 4.5,
//             ar_condicionado: true,
//             tv: true,
//             wifi: true,
//             petFriendly: false,
//             cafeDaManha: true,
//             estacionamento: true,
//             avaliacao: 9.0,
//           });

//           await mockRoomRepository.createRoom(mockUserEntity);
//         }
//       }
//     );

//     and('algumas acomodações possuem café da manhã como comodidade', () => {});

//     when(/^uma requisição GET for enviada para "(.*)"$/, async (url, table) => {
//       response = await request.get(url);
//       console.log(response.body);
//     });

//     then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
//       expect(response.status).toBe(parseInt(statusCode, 10));
//     });

//     and(/^a resposta deve ter um JSON com uma lista de acomodações que possuem café da manhã$/, () => {
//       expect(response.body.every((room: any) => room.cafeDaManha)).toBe(true);
//     });
//     and('a resposta não deve conter acomodações sem café da manhã', () => {
//       expect(response.body.some((room: any) => !room.cafeDaManha)).toBe(false);
//     });
//   });
// });