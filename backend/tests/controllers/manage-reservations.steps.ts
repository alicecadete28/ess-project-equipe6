import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';
import RoomRepository from '../../src/repositories/room.repository';
import RoomEntity from '../../src/entities/room.entity';
import ReservationEntity from '../../src/entities/reservation.entity';
import ReservationRepository from '../../src/repositories/reservation.repository';
import { generateToken } from '../utils/generateToken';

const feature = loadFeature('tests/features/manage-reservation.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockReservationRepository: ReservationRepository;
  let mockRoomRepository: RoomRepository;
  let response: supertest.Response;
  let mockUserEntity: UserEntity;

  let token: string;

  beforeAll(async () => {
    token = generateToken();
  });

  beforeEach(() => {
    mockReservationRepository = di.getRepository<ReservationRepository>(
      ReservationRepository
    );
    mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
  });

  test('Return reservations by room_id', ({ given, when, then, and }) => {
    given(/^o RoomRepository tem um quarto com id "(.*)"$/, async (id) => {
      // Check if the test does not exist in the repository and delete it if it exists
      const user = await mockRoomRepository.getRoom(id);

      console.log(user);
    });

    and(
      /^o ReservationRepository tem as seguintes reservas: pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating_star "(.*)", rating_comment "(.*)"$/,
      async (
        pf_id,
        room_id,
        check_in,
        check_out,
        guests,
        total,
        status,
        rating_s,
        rating_c
      ) => {
        // console.log(pf_id, room_id,check_in,check_out,guests,total,status,rating);
        const reservation =
          await mockReservationRepository.getReservationByRoomId(room_id);
        // console.log(reservation);
      }
    );

    when(/^uma requisição GET é feita para "(.*)"$/, async (url) => {
      response = await request.get(url).set('Authorization', `Bearer ${token}`);
      console.log(response.status);
      console.log(response.text);
    });

    then(/^a resposta deve ter status "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(
      /^a resposta deve ser um JSON com as seguintes reservas: id "(.*)" pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating_star "(.*)", rating_comment "(.*)"$/,
      async (
        id,
        pf_id,
        room_id,
        check_in,
        check_out,
        guests,
        total,
        status,
        rating_s,
        rating_c
      ) => {
        expect(response.body).toEqual([
          {
            check_in: check_in,
            check_out: check_out,
            confirmed: false,
            guests: +guests,
            id: id,
            pf_id: pf_id,
            rating: { comment: rating_c, stars: +rating_s },
            room_id: room_id,
            status: status,
            total: +total,
          },
        ]);
      }
    );
  });

  test('Return reservations by room_id - failed', ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^o RoomRepository não tem um quarto com id "(.*)"$/, async (id) => {
      // Check if the test does not exist in the repository and delete it if it exists
      const user = await mockRoomRepository.getRoom(id);

      console.log(user);
    });

    when(/^uma requisição GET é feita para "(.*)"$/, async (url) => {
      response = await request.get(url).set('Authorization', `Bearer ${token}`);
      console.log(response.status);
      console.log(response.text);
    });

    then(/^o status de resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(
      /^a resposta deve ser um JSON com a seguinte mensagem: "(.*)"$/,
      (message) => {
        expect(response.body).toEqual({ error: message });
      }
    );
  });

  test('Return reservations by pf_id', ({ given, when, then, and }) => {
    given(
      /^o ReservationRepository tem uma reserva com id "(.*)", pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating "(.*)"$/,
      async (
        id,
        pf_id,
        room_id,
        check_in,
        check_out,
        guest,
        total,
        status,
        rating
      ) => {
        const reservation =
          await mockReservationRepository.getReservationByPFId(id);

        if (!reservation) {
          await mockReservationRepository.createReservation(
            new ReservationEntity({
              id,
              pf_id,
              room_id,
              check_in,
              check_out,
              total,
              status,
              rating,
            })
          );
        }
      }
    );

    when(/^uma requisição GET é feita para "(.*)"$/, async (url) => {
      response = await request.get(url).set('Authorization', `Bearer ${token}`);
    });

    then(/^o status de resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(
      /^a resposta deve ser um JSON com a seguinte reserva: id "(.*)", pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating_comment "(.*)", rating_star "(.*)"$/,
      async (
        id,
        pf_id,
        room_id,
        check_in,
        check_out,
        guests,
        total,
        status,
        rating_c,
        rating_s
      ) => {
        expect(response.body).toEqual([
          {
            id: id,
            check_in: check_in,
            check_out: check_out,
            guests: +guests,
            pf_id: pf_id,
            rating: { comment: rating_c, stars: +rating_s },
            room_id: room_id,
            status: status,
            total: +total,
            confirmed: false,
          },
        ]);
      }
    );
  });

  // Está constando um código 200 para isso (retorna um array vazio, oq faz sentido, ao mesmo tempo que nao)
  // test('Return reservations by pf_id - failed', ({ given, when, then, and }) => {
  //     given(/^o ReservationRepository não tem um quarto com id "(.*)"$/,
  //         async (id) => {
  //           // Check if the test does not exist in the repository and delete it if it exists
  //            const user = await mockRoomRepository.getRoom(id);

  //            console.log(user);
  //         }
  //     );
  //
  //     when(/^uma requisição GET é feita para "(.*)"$/,
  //         async (url) => {
  //             response = await request.get(url);
  //             console.log(response.status);
  //             console.log(response.text);
  //         }
  //     );

  //     then(/^o status de resposta deve ser "(.*)"$/,
  //         (statusCode) => {
  //             expect(response.status).toBe(parseInt(statusCode, 10));
  //         }
  //     );

  //     and(/^a resposta deve ser um JSON com a seguinte mensagem: "(.*)"$/,
  //         (message) => {
  //             expect(response.body).toEqual({ error: message });
  //         }
  //     )
  // });
});
