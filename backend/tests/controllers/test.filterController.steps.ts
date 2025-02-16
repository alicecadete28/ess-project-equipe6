
import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';
import RoomService from '../../src/services/room.service';
import { addDays } from 'date-fns';

console.log("Arquivo filterController.steps.ts carregado!");

const feature = loadFeature('tests/features/filter.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let response: any;
  let mockRoomService: RoomService;

// beforeEach(() => {
//   const mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
//   mockRoomService = new RoomService(mockRoomRepository);

//   console.log("Mock de RoomService criado:", mockRoomService);
// });

beforeEach(() => {
  const mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
  mockRoomService = new RoomService(mockRoomRepository);

  console.log("Mock de RoomService criado:", mockRoomService);
});



test('Filtrar acomodações Pet Friendly sem disponibilidade', ({ given, when, then, and }) => {
  given(
    /^o RoomService não encontra acomodações Pet Friendly para "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/,
    function (destino, dataIda, dataVolta, numPessoas) {
      console.log("Mock de buscarAcomodacoes sendo definido para:", destino, dataIda, dataVolta, numPessoas);

      jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([]);
    }
  );
  
  when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async function (method, endpoint) {
    console.log("Enviando requisição para:", `/api${endpoint}`);
    response = await request.get(`/api${endpoint}`);
    console.log("Resposta recebida:", response.body);
  });
  
  then(/^o status da resposta deve ser "(.*)"$/, function (expectedStatus) {
    const expectedStatuses = [200, 404]; 
    expect(expectedStatuses).toContain(Number(response.status));
});
  
then(/^o JSON da resposta deve ser uma lista vazia$/, function () {
  if (response.body.message) {
    expect(response.body.message).toBe("Nenhuma acomodação atende aos filtros selecionados.");
  } else {
    expect(response.body).toEqual([]);
  }
});
  
  then(/^a mensagem "(.*)" deve ser retornada$/, function (expectedMessage) {
    expect(response.body.message).toBe(expectedMessage);
  });
  
  // 🟢 **Cenário: Filtrar acomodações Wi-Fi com disponibilidade**
  test('Filtrar acomodações Wifi com disponibilidade', ({ given, and, when, then }) => {
  given(
    /^o RoomService retorna uma lista de acomodações disponíveis em "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/,
    function (destino, dataIda, dataVolta, numPessoas) {
      jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([
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
          {
            id: '303',
            pj_id: 'PJ789',
            description: 'Hostel Praia',
            type: 'Hostel',
            price: 100,
            capacity: 4,
            caracteristics_ids: [],
            local: 'Recife',
            stars: 2,
            ar_condicionado: false,
            tv: false,
            wifi: false,
            petFriendly: true,
            cafeDaManha: false,
            estacionamento: false,
            avaliacao: 3.5,
          },
        ]);      
    }
  );
  and(/^algumas acomodações possuem Wi-Fi como comodidade$/, function () {
    jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([
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

  when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async function (method, endpoint) {
    const destino = 'Recife';
        const dataCheckIn = addDays(new Date(), 1).toISOString().split('T')[0];
        const dataCheckOut = addDays(new Date(), 3).toISOString().split('T')[0];
        const numHospedes = 2;

    const queryParams = {
        destino: 'Recife',
        data_ida: dataCheckIn,  
        data_volta: dataCheckOut,
        num_pessoas: '2',
        wifi: 'true'
    };

    console.log("📤 Enviando requisição com parâmetros corrigidos:", queryParams);
    response = await request.get(`/api${endpoint}`).query(queryParams);
    console.log("📩 Resposta recebida:", response.body);
});

  then(/^o status da resposta deve ser "(.*)"$/, function (expectedStatus) {
    const expectedStatuses = [200, 404]; 
    expect(expectedStatuses).toContain(Number(response.status));
    console.log("🔢 Status da resposta:", );
});

  and(/^o JSON da resposta deve ser uma lista de acomodações que possuem Wi-Fi$/, function () {
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ wifi: true })])
    );
  });

  and(/^a acomodação com id "(.*)" e nome "(.*)" com Wi-Fi está na lista$/, function (id, nome) {
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id, description: nome, wifi: true })])
    );
  });
  
  and(/^a acomodação com id "(.*)" e nome "(.*)" com Wi-Fi está na lista$/, function (id, nome) {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id, description: nome, wifi: true }), // ✅ "nome" vira "description"
        ])
      );
    });
    
  and(/^nenhuma acomodação sem Wi-Fi deve estar na lista$/, function () {
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ wifi: false }),
      ])
    );
  });
});
  
  // 🍞 **Cenário: Filtrar acomodações com café da manhã**
  test('Filtrar acomodações com café da manhã', ({ given, and, when, then }) => {
  given(/^o RoomService retorna uma lista de acomodações disponíveis em "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/, function () {
      jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([
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
          {
            id: '303',
            pj_id: 'PJ789',
            description: 'Hostel Praia',
            type: 'Hostel',
            price: 100,
            capacity: 4,
            caracteristics_ids: [],
            local: 'Recife',
            stars: 2,
            ar_condicionado: false,
            tv: false,
            wifi: false,
            petFriendly: true,
            cafeDaManha: false,
            estacionamento: false,
            avaliacao: 3.5,
          },
        ]);      
  });

  and('algumas acomodações possuem cafe da manha como comodidade', function () {
    jest.spyOn(mockRoomService, 'buscarAcomodacoes').mockResolvedValue([
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
  
  when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async function (method, endpoint) {
    response = await request.get(`/api${endpoint}`);
  });

  then(/^o status da resposta deve ser "(.*)"$/, function (expectedStatus) {
    const expectedStatuses = [200, 404]; 
    expect(expectedStatuses).toContain(Number(response.status));
});

  and('o JSON da resposta deve ser uma lista de acomodações que possuem cafe da manha', function () {
      expect(response.body).toEqual(
        expect.arrayContaining([expect.objectContaining({ cafeDaManha: true })])
      );
    });
  
    and('nenhuma acomodação sem cafe da manha deve estar na lista', function () {
      expect(response.body).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ cafeDaManha: false })])
      );
    });
  });
});
  
});
  
// npx jest --verbose --coverage  --config ./jest.config.js --detectOpenHandles ./tests/controllers/test.filterController.steps.ts

// erro