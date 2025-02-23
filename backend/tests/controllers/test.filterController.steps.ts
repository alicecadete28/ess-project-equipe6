import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';
import RoomEntity from '../../src/entities/room.entity';

const feature = loadFeature('tests/features/filter-controller.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockTestRepository: RoomRepository;
  let response: supertest.Response;
  let mockRoomEntity: RoomEntity;

  beforeEach(() => {
    mockTestRepository = di.getRepository<RoomRepository>(RoomRepository);
  });

  test('Acomodações com Wi-Fi disponíveis', ({ given, when, then, and }) => {
    given(
      /^o RoomRepository possui acomodações disponíveis em "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/,
      async () => {
        // Check if the test does not exist in the repository and delete it if it exists
        const room = await mockTestRepository.getRooms();

        if (room.filter((item) => item.wifi).length === 0) {
          mockRoomEntity = new RoomEntity({
            id: '101',
            description: 'Hotel Recife',
            price: 100,
            capacity: 2,
            wifi: true,
            type: 'single',
            local: 'Recife',
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

    and('algumas acomodações possuem Wi-Fi como comodidade', () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url).send();
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode));
    });

    and(
      /^a resposta deve ter um JSON com uma lista de acomodações que possuem Wi-Fi$/,
      () => {
        expect(response.body).toBeInstanceOf(Array<RoomEntity>);
        const onlyWifiRooms = response.body.every(
          (room: RoomEntity) => room.wifi
        );
        expect(onlyWifiRooms).toBe(true);
      }
    );
  });
  test('Acomodações com café da manhã disponíveis', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^o RoomRepository possui acomodações disponíveis em "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/,
      async () => {
        // Check if the test does not exist in the repository and delete it if it exists
        const room = await mockTestRepository.getRooms();

        if (!room) {
          mockRoomEntity = new RoomEntity({
            id: '101',
            description: 'Hotel Recife',
            price: 100,
            capacity: 2,
            wifi: true,
            type: 'single',
            local: 'Recife',
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

    and('algumas acomodações possuem café da manhã como comodidade', () => {});

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url).send();
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode));
    });

    and(
      /^a resposta deve ter um JSON com uma lista de acomodações que possuem café da manhã$/,
      () => {
        expect(response.body).toBeInstanceOf(Array<RoomEntity>);
        const onlyCafeDaManhaRooms = response.body.every(
          (room: RoomEntity) => room.cafeDaManha
        );
        expect(onlyCafeDaManhaRooms).toBe(true);
      }
    );
  });
});

//npx jest --verbose --config ./jest.config.js --detectOpenHandles tests/controllers/test.filterController.steps.ts

//ok
