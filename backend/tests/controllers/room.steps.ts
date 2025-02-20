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
    given(
      /^o RoomRepository não tem um room com id "(.*)"$/,
      async (roomId) => {
        // Check if the room does not exist in the repository and delete it if it exists
        const existingRoom = await mockRoomRepository.getRoom(roomId);

        if (existingRoom) {
          await mockRoomRepository.deleteRoom(existingRoom.id);
        }
      }
    );

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com :"$/,
      async (
        url,
        roomPj_id
        // roomDescription,
        // roomType,
        // roomPrice,
        // roomCapacity,
        // roomCaracteristics_ids,
        // roomLocal,
        // roomStars,
        // roomAr_condicionado,
        // roomTv,
        // roomWifi,
        // roomPetFriendly,
        // roomCafeDaManha,
        // roomEstacionamento,
        // roomAvaliacao
      ) => {
        response = await request.post(url).send({
          pj_id: roomPj_id,
          // description: roomDescription,
          // type: roomType,
          // price: roomPrice,
          // capacity: roomCapacity,
          // caracteristics_ids: roomCaracteristics_ids,
          // local: roomLocal,
          // stars: roomStars,
          // ar_condicionado: roomAr_condicionado,
          // tv: roomTv,
          // wifi: roomWifi,
          // petFriendly: roomPetFriendly,
          // cafeDaManha: roomCafeDaManha,
          // estacionamento: roomEstacionamento,
          // avaliacao: roomAvaliacao,
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
