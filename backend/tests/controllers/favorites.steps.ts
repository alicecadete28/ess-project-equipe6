import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import PfRepository from '../../src/repositories/pf.repository';
import PFEntity from '../../src/entities/pf.entity';

const feature = loadFeature('tests/features/favorites.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockTestRepository: PfRepository;
  let response: supertest.Response;
  let mockPfEntity: PFEntity;

  beforeEach(() => {
    mockTestRepository = di.getRepository<PfRepository>(PfRepository);
  });

  test('lista de favoritos de um usuario bem sucedido', ({ given, when, then, and }) => {
    given(
      /^o PfRepository tem um usuário com cpf "(.*)" e phone "(.*)"$/,
      async (cpf) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const user = await mockTestRepository.getPfByCpf(cpf);

        if (!user) {
            mockPfEntity = new PFEntity({
            id: '12732',
            user_id: '1',
            name: 'bia',
            birth_date: new Date(2000, 0, 9),
            cpf: '28173891',
            phone: '98171-2882',
            favorites: ['12', '22', '32'],
            savedRooms: [''],
          });

          await mockTestRepository.createPf(mockPfEntity);
        }
      }
    );

    when(
      /^uma requisição GET for enviada para "(.*)" com o corpo da requisição sendo um JSON com cpf "(.*)" e phone "(.*)"$/,
      async (id, cpf, phone) => {
        response = await request.get(id).query({
          cpf,
          phone,
        });
        console.log(response.body);
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta deve ter um JSON com os favoritos$/, () => {
      expect(response.body.data).toEqual(["12", "22", "32"]);
    });
  });
  test('Falha ao acessar a lista de favoritos de um usuario', ({ given, when, then, and }) => {
    given(
      /^o PfRepository tem um usuário com cpf "(.*)" e phone "(.*)"$/,
      async (cpf) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const user = await mockTestRepository.getPfByCpf(cpf);

        if (user) {
          await mockTestRepository.createPf(mockPfEntity);
        }
      }
    );

    when(
      /^uma requisição GET for enviada para "(.*)" com o corpo da requisição sendo um JSON com cpf "(.*)" e phone "(.*)"$/,
      async (id, cpf, phone) => {
        response = await request.get(id).query({
          cpf,
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

});