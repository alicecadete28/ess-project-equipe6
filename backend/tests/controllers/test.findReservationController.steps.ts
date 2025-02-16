import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';
import RoomService from '../../src/services/room.service';
import { addDays } from 'date-fns';

console.log("Arquivo findReservations.steps.ts carregado!");

const feature = loadFeature('tests/features/findReservations.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: any;
  let mockRoomService: RoomService;
  let expectedStatus: number;

  beforeEach(() => {
    const mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
    mockRoomService = new RoomService(mockRoomRepository);
    
    jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockImplementation(async () => [
      {
        id: '101',
        pj_id: 'PJ123',
        description: 'Hotel Recife',
        type: 'Luxo',
        price: 500,
        capacity: 2,
        caracteristics_ids: [],
        local: 'Recife',
        stars: 4,
        ar_condicionado: true,
        tv: true,
        wifi: true,
        petFriendly: false,
        cafeDaManha: true,
        estacionamento: true,
        avaliacao: 4.5,
      },
      {
        id: '202',
        pj_id: 'PJ456',
        description: 'Pousada Beira-Mar',
        type: 'Pousada',
        price: 300,
        capacity: 3,
        caracteristics_ids: [],
        local: 'Recife',
        stars: 3,
        ar_condicionado: false,
        tv: true,
        wifi: true,
        petFriendly: true,
        cafeDaManha: true,
        estacionamento: false,
        avaliacao: 4.0,
      },
    ]);
  });

  test('Encontrar quartos disponíveis', ({ given, when, then, and }) => {
    given(/^o RoomService retorna uma lista de acomodações disponíveis para "(.*)"$/, function (destino) {
      jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([
        {
            id: '101',
            pj_id: 'PJ123',
            description: 'Hotel Recife',
            type: 'deluxe',
            price: 250,
            capacity: 2,
            caracteristics_ids: [],
            local: 'Recife, PE',
            stars: 4.5,
            ar_condicionado: true,
            tv: true,
            wifi: true,
            petFriendly: false,
            cafeDaManha: true,
            estacionamento: true,
            avaliacao: 9.0,
        },
        {
            id: '202',
            pj_id: 'PJ456',
            description: 'Pousada Beira-Mar',
            type: 'standard',
            price: 150,
            capacity: 1,
            caracteristics_ids: [],
            local: 'Recife, PE',
            stars: 3.8,
            ar_condicionado: false,
            tv: false,
            wifi: true,
            petFriendly: false,
            cafeDaManha: false,
            estacionamento: false,
            avaliacao: 7.5,
        },
      ]);
    });

    and(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

    when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async function (method, endpoint) {
      response = await request.get(`/api${endpoint}`).query({
        destino: 'Recife',
        data_ida: '2025-03-10',
        data_volta: '2025-03-15',
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, function (status) {
      expectedStatus = Number(status);
      expect(response.status).toBe(expectedStatus);
    });

    and('o JSON da resposta deve ser uma lista de acomodações disponíveis', () => {
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: '101', description: 'Hotel Recife' }),
        expect.objectContaining({ id: '202', description: 'Pousada Beira-Mar' })
      ]));
    });
  });

  test('Buscar acomodações sem destino informado', ({ given, when, then, and }) => {
    given(/^o destino não foi informado na requisição$/, function () {
      jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([]);
    });

    when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async function (method, endpoint) {
      response = await request.get(`/api${endpoint}`).query({
        data_ida: '2025-03-10',
        data_volta: '2025-03-15',
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, function (status) {
      expectedStatus = Number(status);
      expect(response.status).toBe(expectedStatus);
    });

    and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, function (expectedMessage) {
      expect(response.body.error).toBe(expectedMessage);
    });
  });

test('Buscar acomodações com datas inválidas', ({ given, when, then, and }) => {
    given(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

    when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async function (method, endpoint) {
      response = await request.get(`/api${endpoint}`).query({
        destino: 'Recife',
        data_ida: '2025-03-15',
        data_volta: '2025-03-10',
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, function (status) {
      expectedStatus = Number(status);
      expect(response.status).toBe(expectedStatus);
    });

    and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, function (expectedMessage) {
      expect(response.body.message).toBe(expectedMessage);
    });
  });

  test('Buscar acomodações para 4 hóspedes', ({ given, when, then, and }) => {
    given(/^o RoomService retorna uma lista de acomodações adequadas para "(.*)" hóspedes em "(.*)"$/, function () {
      jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([
        { id: '303',
            pj_id: 'PJ789',
            description: 'Suíte Familiar',
            type: 'premium',
            price: 400,
            capacity: 4,
            caracteristics_ids: [],
            local: 'Recife, PE',
            stars: 4.8,
            ar_condicionado: true,
            tv: true,
            wifi: true,
            petFriendly: false,
            cafeDaManha: true,
            estacionamento: true,
            avaliacao: 9.5,},
        { id: '404',
            pj_id: 'PJ999',
            description: 'Cobertura Luxo',
            type: 'luxo',
            price: 800,
            capacity: 6,
            caracteristics_ids: [],
            local: 'Recife, PE',
            stars: 5.0,
            ar_condicionado: true,
            tv: true,
            wifi: true,
            petFriendly: false,
            cafeDaManha: true,
            estacionamento: true,
            avaliacao: 9.8, },
      ]);
    });

    and(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

    when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async function (method, endpoint) {
      response = await request.get(`/api${endpoint}`).query({
        destino: 'Recife',
        num_pessoas: 4,
        data_ida: '2025-03-10',
        data_volta: '2025-03-15',
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, function (status) {
      expectedStatus = Number(status);
      expect(response.status).toBe(expectedStatus);
    });

    and('o JSON da resposta deve ser uma lista de acomodações para 4 hóspedes', () => {
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: '303', capacity: 4 }),
        expect.objectContaining({ id: '404', capacity: 6 })
      ]));
    });
  });
  test('Buscar acomodações para 10 hóspedes sem acomodações disponíveis', ({ given, when, then, and }) => {
    given(/^o RoomService retorna uma lista vazia para "(.*)" hóspedes em "(.*)"$/, function () {
      jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([]);
    });

    and(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

    when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async function (method, endpoint) {
      response = await request.get(`/api${endpoint}`).query({
        destino: 'Recife',
        num_pessoas: 10,
        data_ida: '2025-03-10',
        data_volta: '2025-03-15',
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, function (status) {
      expectedStatus = Number(status);
      expect(response.status).toBe(expectedStatus);
    });

    and(/^a mensagem "(.*)" deve ser retornada$/, function (expectedMessage) {
      expect(response.body.message).toBe(expectedMessage);
    });
  });

  test('Nenhuma acomodação disponível para o destino e datas selecionadas', ({ given, when, then, and }) => {
    given(/^o RoomService não encontra acomodações disponíveis para "(.*)" entre "(.*)" e "(.*)"$/, function () {
      jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([]);
    });

    when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async function (method, endpoint) {
      response = await request.get(`/api${endpoint}`).query({
        destino: 'Recife',
        data_ida: '2025-03-10',
        data_volta: '2025-03-15',
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, function (status) {
      expectedStatus = Number(status);
      expect(response.status).toBe(expectedStatus);
    });

    and(/^a mensagem "(.*)" deve ser retornada$/, function (expectedMessage) {
      expect(response.body.message).toBe(expectedMessage);
    });
  });
});


// npx jest --verbose --coverage  --config ./jest.config.js --detectOpenHandles ./tests/controllers/test.findReservationController.steps.ts
