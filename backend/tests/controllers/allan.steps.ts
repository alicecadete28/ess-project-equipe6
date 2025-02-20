import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';

const feature = loadFeature('tests/features/login.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockTestRepository: UserRepository;
  let response: supertest.Response;
  let mockUserEntity: UserEntity;

  beforeEach(() => {
    mockTestRepository = di.getRepository<UserRepository>(UserRepository);
  });

  test('Login bem-sucedido', ({ given, when, then, and }) => {
    given(
      /^o UserRepository tem um usuario com email "(.*)" e password "(.*)"$/,
      async (email, password) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const user = await mockTestRepository.getUserByEmail(email);

        if (!user) {
          mockUserEntity = new UserEntity({
            id: '',
            email,
            password,
            type: 'pf',
          });

          await mockTestRepository.createUser(mockUserEntity);
        }
      }
    );

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com email "(.*)" e password "(.*)"$/,
      async (url, email, password) => {
        response = await request.post(url).send({
          email,
          password,
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta deve ter um JSON com o token de autenticação$/, () => {
      expect(response.body.data).toHaveProperty('token');
    });
  });

  test('Falha no login por usuário não encontrado', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^o UserRepository não tem um usuario com email "(.*)" e password "(.*)"$/,
      async (email, password) => {
        // Check if the test exists in the repository and delete it if it exists
        const user = await mockTestRepository.getUserByEmail(email);

        if (user) {
          await mockTestRepository.deleteUser(user.id);
        }
      }
    );

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com email "(.*)" e password "(.*)$/,
      async (url, email, password) => {
        response = await request.post(url).send({
          email,
          password,
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

  test('Falha no login por senha incorreta', ({ given, when, then, and }) => {
    given(
      /^o UserRepository tem um usuario com email "(.*)" e password "(.*)"$/,
      async (email, password) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const user = await mockTestRepository.getUserByEmail(email);
        if (user) {
          mockUserEntity = new UserEntity({
            id: '',
            email,
            password,
            type: 'pf',
          });

          await mockTestRepository.createUser(mockUserEntity);
        }
      }
    );

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON  com email "(.*)" e password "(.*)"$/,
      async (url, email, password) => {
        response = await request.post(url).send({
          email,
          password,
        });
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

  test('Falha no login por campos obrigatórios não preenchidos', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^o UserRepository tem um usuario com email "(.*)" e password "(.*)"$/,
      async (email, password) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const user = await mockTestRepository.getUserByEmail(email);
        if (user) {
          mockUserEntity = new UserEntity({
            id: '',
            email,
            password,
            type: 'pf',
          });

          await mockTestRepository.createUser(mockUserEntity);
        }
      }
    );

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com email "(.*)" e password "(.*)$/,
      async (url, email, password) => {
        response = await request.post(url).send({
          email,
          password,
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(
      /^a resposta deve ter um JSON com a mensagem de erro "(.*)"$/,
      (message) => {
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe(message);
      }
    );
  });
});
