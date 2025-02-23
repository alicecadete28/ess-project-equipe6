import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import PfRepository from '../../src/repositories/pf.repository';
import PFEntity from '../../src/entities/pf.entity';

const feature = loadFeature('tests/features/saved.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockTestRepository: PfRepository;
  let response: supertest.Response;
  let mockPfEntity: PFEntity;

  beforeEach(() => {
    mockTestRepository = di.getRepository<PfRepository>(PfRepository);
  });

  test('lista de savedRooms de um usuario bem sucedido', ({ given, when, then, and }) => {
    given(
      /^o PfRepository tem um usuário com id "(.*)" e phone "(.*)"$/,
      async (id, phone) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const user = await mockTestRepository.getPfById(id);

        if (!user) {
            mockPfEntity = new PFEntity({
            id,
            user_id: '1',
            name: 'bia',
            birth_date: new Date(2000, 0, 9),
            cpf: '28173891',
            phone,
            favorites: ['12', '22', '32'],
            savedRooms: [''],
          });

          await mockTestRepository.createPf(mockPfEntity);
        }
      }
    );

    when(
      /^uma requisição GET for enviada para "(.*)" com o corpo da requisição sendo um JSON com id "(.*)" e phone "(.*)"$/,
      async (url, id, phone) => {
        response = await request.get(url).query({
          id,
          phone,
        });
        console.log(response.body);
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta deve ter um JSON com os savedRooms$/, () => {
      expect(response.body.data).toEqual(["12", "222", "32"]);
    });
  });

  test('Falha ao acessar a lista de savedRooms de um usuario', ({ given, when, then, and }) => {
    given(
      /^o PfRepository tem um usuário com id "(.*)" e phone "(.*)"$/,
      async (id) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const user = await mockTestRepository.getPfById(id);

        if (user) {
          await mockTestRepository.createPf(mockPfEntity);
        }
      }
    );

    when(
      /^uma requisição GET for enviada para "(.*)" com o corpo da requisição sendo um JSON com id "(.*)" e phone "(.*)"$/,
      async (url, id, phone) => {
        response = await request.get(url).query({
          id,
          phone,
        });
        console.log(response.body);
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(
      /^a resposta deve ter um JSON com a mensagem de erro "(.*)"$/,
      (message) => {
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe(message);
      }
    );
  });
  test('Atualizar a lista de salvos de um usuário com sucesso', ({ given, when, then, and }) => {
    given(
      /^o PfRepository tem um usuário com id "(.*)" e phone "(.*)"$/, 
      async (id, phone) => {
        const user = await mockTestRepository.getPfById(id);
        if (!user) {
          mockPfEntity = new PFEntity({
            id,
            user_id: '1',
            name: 'bia',
            birth_date: new Date(2000, 0, 9),
            cpf: '28173891',
            phone,
            favorites: [''],
            savedRooms: ['12', '222', '32'],
          });
          await mockTestRepository.createPf(mockPfEntity);
        }
      }
    );

    when(
      /^uma requisição PATCH for enviada para "(.*)" com o corpo da requisição sendo um JSON contendo id "(.*)", phone "(.*)" e uma lista de salvos atualizada$/, 
      async (url, id, phone) => {
        response = await request.patch(url).send({
          id,
          phone,
          savedRooms: ['15', '25', '35'],
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta deve ter um JSON confirmando a atualização da lista de salvos$/, () => {
      expect(response.body).toEqual({
        msg: "PATCH /api/saved/12732",
        msgCode: "success",
        code: 200,
        data: ["15", "25", "35"],
      });
    });
  });
  test('Falha ao atualizar a lista de salvos de um usuário', ({ given, when, then, and }) => {
    given(
      /^o PfRepository não tem um usuário com cpf "(.*)" e phone "(.*)"$/, 
      async (cpf, phone) => {
        const user = await mockTestRepository.getPfByCpf(cpf);
        expect(user).toBeNull();
      }
    );

    when(
      /^uma requisição PATCH for enviada para "(.*)" com o corpo da requisição sendo um JSON contendo cpf "(.*)", phone "(.*)" e uma lista de salvos$/, 
      async (url, cpf, phone) => {
        response = await request.patch(url).send({
          cpf,
          phone,
          favorites: ['10', '20', '30'],
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta deve ter um JSON com a mensagem de erro "(.*)"$/, (message) => {
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe("Pf não cadastrado");
    });
  });

});