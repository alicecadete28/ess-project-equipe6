import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';
import RoomEntity from '../../src/entities/room.entity';

const feature = loadFeature(
  'tests/features/findReservation-controller.feature'
);
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockTestRepository: RoomRepository;
  let response: supertest.Response;
  let mockRoomEntity: RoomEntity;

  beforeEach(() => {
    mockTestRepository = di.getRepository<RoomRepository>(RoomRepository);
  });

  // ✅ Cenário: Encontrar quartos disponíveis
  test('Encontrar quartos disponíveis', ({ given, and, when, then }) => {
    given(
      /^o RoomRepository tem acomodações para "(.*)" entre "(.*)" e "(.*)"$/,
      async (destino) => {
        const room = await mockTestRepository.getRooms();

        if (room.filter((item) => item.local === destino).length === 0) {
          mockRoomEntity = new RoomEntity({
            id: '101',
            description: 'Hotel Recife',
            price: 100,
            capacity: 2,
            wifi: true,
            type: 'single',
            local: destino,
            stars: 4,
            ar_condicionado: true,
            tv: true,
            petFriendly: true,
            cafeDaManha: true,
            estacionamento: true,
            avaliacao: 4,
            pj_id: '1',
            caracteristics_ids: [],
          });

          await mockTestRepository.createRoom(mockRoomEntity);
        }
      }
    );

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url).send();
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode));
    });

    and(
      'o JSON da resposta deve ser uma lista de acomodações disponíveis',
      () => {
        expect(response.body).toBeInstanceOf(Array);
        const rooms = response.body.every(
          (room: RoomEntity) => room.local == 'Recife'
        );
        expect(rooms).toBe(true);
      }
    );
  });

  // ✅ Cenário: Buscar acomodações sem destino informado
  test('Buscar acomodações sem destino informado', ({
    given,
    when,
    then,
    and,
  }) => {
    given('o destino não foi informado na requisição', () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url).send();
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode));
    });

    and(
      /^o JSON da resposta deve conter a mensagem "(.*)"$/,
      (expectedMessage) => {
        expect(response.body.error).toBe(expectedMessage);
      }
    );
  });

  // ✅ Cenário: Buscar acomodações com datas inválidas
  test('Buscar acomodações com datas inválidas', ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url).send();
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode));
    });

    and(
      /^o JSON da resposta deve conter a mensagem "(.*)"$/,
      (expectedMessage) => {
        expect(response.body.message).toBe(expectedMessage);
      }
    );
  });

  // ✅ Cenário: Buscar acomodações para 4 hóspedes
  test('Buscar acomodações para 4 hóspedes', ({ given, and, when, then }) => {
    given(
      /^o RoomRepository retorna uma lista de acomodações adequadas para "(.*)" hóspedes em "(.*)"$/,
      async (numHospedes, destino) => {
        const room = await mockTestRepository.getRooms();

        if (room.filter((item) => item.capacity >= 4).length === 0) {
          mockRoomEntity = new RoomEntity({
            id: '101',
            description: 'Hotel Recife',
            price: 100,
            capacity: 4,
            wifi: true,
            type: 'single',
            local: destino,
            stars: 4,
            ar_condicionado: true,
            tv: true,
            petFriendly: true,
            cafeDaManha: true,
            estacionamento: true,
            avaliacao: 4,
            pj_id: '1',
            caracteristics_ids: [],
          });

          await mockTestRepository.createRoom(mockRoomEntity);
        }
      }
    );

    and(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url).send();
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode));
    });

    and(
      /^o JSON da resposta deve ser uma lista de acomodações para (\d+) hóspedes$/,
      (numHospedes) => {
        expect(response.body).toBeInstanceOf(Array);
        const fourPeopleRooms = response.body.every(
          (room: RoomEntity) => room.capacity >= Number(numHospedes)
        );
        expect(fourPeopleRooms).toBe(true);
      }
    );
  });

  // ✅ Cenário: Buscar acomodações para 10 hóspedes sem acomodações disponíveis
  test('Buscar acomodações para 10 hóspedes sem acomodações disponíveis', ({
    given,
    and,
    when,
    then,
  }) => {
    given(
      /^o RoomRepository não tem acomodação para "(.*)" hóspedes em "(.*)"$/,
      async (numHospedes, destino) => {
        const rooms = await mockTestRepository.getRooms();

        if (rooms) {
          for (const room of rooms) {
            if (room.capacity >= numHospedes)
              await mockTestRepository.deleteRoom(room.id);
          }
        }
      }
    );

    and(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url).send();
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode));
    });

    and(
      /^o JSON da resposta deve conter a mensagem "(.*)"$/,
      (expectedMessage) => {
        expect(response.body.message).toBe(expectedMessage);
      }
    );
  });

  // ✅ Cenário: Nenhuma acomodação disponível para o destino e datas selecionadas
  test('Nenhuma acomodação disponível para o destino e datas selecionadas', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^o RoomRepository não tem acomodações disponíveis para "(.*)" entre "(.*)" e "(.*)"$/,
      async (destino, dataIda, dataVolta) => {
        const rooms = await mockTestRepository.getRooms();

        if (rooms) {
          for (const room of rooms) {
            if (room.local === destino)
              await mockTestRepository.deleteRoom(room.id);
          }
        }
      }
    );

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url).send();
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode));
    });

    and(
      /^o JSON da resposta deve conter a mensagem "(.*)" deve ser retornada$/,
      (expectedMessage) => {
        expect(response.body.message).toBe(expectedMessage);
      }
    );
  });
});

//npx jest --verbose --coverage  --config ./jest.config.js --detectOpenHandles ./tests/controllers/test.findReservationController.steps.ts

//erro 404 em tudo ou undefined
