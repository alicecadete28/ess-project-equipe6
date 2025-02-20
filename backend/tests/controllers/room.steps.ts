import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';

const feature = loadFeature('tests/features/room.feature');
const request = supertest(app);

defineFeature(feature, (room) => {
  // mocking the repository
  let mockRoomRepository: RoomRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
  });

  room('Create a room', ({ given, when, then, and }) => {
    given(/^o usuário tem um id de pj "(.*)"$/, async (roomId) => {
      // // Check if the room does not exist in the repository and delete it if it exists
      // const existingRoom = await mockRoomRepository.getRoom(roomId);
      // if (existingRoom) {
      //   await mockRoomRepository.deleteRoom(existingRoom.id);
      // }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com :"$/,
      async (url, table) => {
        response = await request.post(url).send({
          pj_id: table[1],
          description: table[2],
          type: table[3],
          price: table[4],
          capacity: table[5],
          caracteristics_ids: table[6],
          local: table[7],
          stars: table[8],
          ar_condicionado: table[9],
          tv: table[10],
          wifi: table[11],
          petFriendly: table[12],
          cafeDaManha: table[13],
          estacionamento: table[14],
          avaliacao: table[15],
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter o nome "(.*)"$/, (message) => {
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe(message);
    });
  });
});
*/