import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';
import RoomEntity from '../../src/entities/room.entity';

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
    given(/^o usuário tem um id de pj "(.*)"$/, async (roomPjId) => {
      // // Check if the room does not exist in the repository and delete it if it exists
      // const existingRoom = await mockRoomRepository.getRoom(roomId);
      // if (existingRoom) {
      //   await mockRoomRepository.deleteRoom(existingRoom.id);
      // }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com:$/,
      (arg0, table) => {
        console.log('table', table[0]);
        const roomEntity = new RoomEntity({
          id: ,
          pj_id: ,
          description: table[0],
          type: table[1],
          price: table[2],
          capacity: table[3],
          caracteristics_ids: table[4],
          local: table[5],
          stars: table[6],
          ar_condicionado: table[7],
          tv: table[8],
          wifi: table[9],
          petFriendly: table[10],
          cafeDaManha: table[11],
          estacionamento: table[12],
          avaliacao: table[13],
        });
        console.log('room entity', roomEntity);
        return request
          .post(arg0)
          .send(roomEntity)
          .then((res) => {
            response = res; // Atualiza a variável response
          })
          .catch((err) => {
            console.error('Erro na requisição:', err);
          });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter a msg "(.*)"$/, (message) => {
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe(message);
    });
  });

  // room(
  //   'Room could not be created due to incompleted fields',
  //   ({ given, when, then, and }) => {
  //     given(/^o usuário tem um id de pj "(.*)"$/, async (roomId) => {
  //       // // Check if the room does not exist in the repository and delete it if it exists
  //       // const existingRoom = await mockRoomRepository.getRoom(roomId);
  //       // if (existingRoom) {
  //       //   await mockRoomRepository.deleteRoom(existingRoom.id);
  //       // }
  //     });

  //     when(
  //       /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com:$/,
  //       (arg0, table2) => {
  //         const roomEntity = new RoomEntity({
  //           id: table2[0],
  //           pj_id: table2[1],
  //           description: table2[2],
  //           type: table2[3],
  //           price: table2[4],
  //           capacity: table2[5],
  //           caracteristics_ids: table2[6],
  //           local: table2[7],
  //           stars: table2[8],
  //           ar_condicionado: table2[9],
  //           tv: table2[10],
  //           wifi: table2[11],
  //           petFriendly: table2[12],
  //           cafeDaManha: table2[13],
  //           estacionamento: table2[14],
  //           avaliacao: table2[15],
  //         });
  //         console.log(table2);

  //         return request
  //           .post(arg0)
  //           .send(roomEntity)
  //           .then((res) => {
  //             response = res; // Atualiza a variável response
  //           })
  //           .catch((err) => {
  //             console.error('Erro na requisição:', err);
  //           });
  //       }
  //     );

  //     then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
  //       expect(response.status).toBe(parseInt(statusCode, 10));
  //     });

  //     and(
  //       /^o JSON da resposta deve conter a mensagem de erro "(.*)"$/,
  //       (message) => {
  //         expect(response.body).toHaveProperty('error');
  //         expect(response.body.error).toBe(message);
  //       }
  //     );
  //   }
  // );
});
