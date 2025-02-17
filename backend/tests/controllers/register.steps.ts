import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';
import PfRepository from '../../src/repositories/pf.repository';
import { Console } from 'console';
import PjRepository from '../../src/repositories/pj.repository';

const feature = loadFeature('tests/features/register.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockTestRepository: UserRepository;
  let mockPfRepository: PfRepository;
  let mockPjRepository: PjRepository;
  let response: supertest.Response;
  let mockUserEntity: UserEntity;

  beforeEach(() => {
    mockTestRepository = di.getRepository<UserRepository>(UserRepository);
    mockPfRepository = di.getRepository<PfRepository>(PfRepository);
    mockPjRepository = di.getRepository<PjRepository>(PjRepository);
  });

  test('Cadastro de Pessoa Física com sucesso', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^o PfRepository não tem uma pessoa física com o id "(.*)"$/,
      async (id) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const pf = await mockPfRepository.getPfById(id);

        if (pf) {
          await mockPfRepository.deletePf(id);
        }
      }
    );

    and(
      /^o UserRepository não tem um usuário com o email "(.*)" e senha "(.*)" e type "(.*)"$/,
      async (email, password, type) => {
        const user = await mockTestRepository.getUserByEmail(email);

        if (user) {
          await mockTestRepository.deleteUser(user.id);
        }
      }
    );

    when(
      /^eu faço um POST para "(.*)" com o corpo da requisição sendo um JSON com um objeto user com campo  email "(.*)" e password "(.*)" e um objeto cliente com campo name "(.*)" e cpf "(.*)" e birth_date "(.*)" e phone "(.*)"$/,
      async (url, email, password, name, cpf, birth_date, phone) => {
        response = await request.post(url).send({
          user: { email, password },
          client: { name, cpf, birth_date, phone },
        });
      }
    );

    then(
      /^a resposta deve ser "(.*)" com a mensagem "(.*)"$/,
      (statusCode, message) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
        expect(response.body.data).toBe(message);
      }
    );
  });

  test('Falha ao cadastrar Pessoa Física com CPF inválido', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^o PfRepository não tem uma pessoa física com o id "(.*)"$/,
      async (id) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const pf = await mockPfRepository.getPfById(id);

        if (pf) {
          await mockPfRepository.deletePf(id);
        }
      }
    );

    and(
      /^o UserRepository não tem um usuário com o email "(.*)" e senha "(.*)" e type "(.*)"$/,
      async (email, password, type) => {
        const user = await mockTestRepository.getUserByEmail(email);

        if (user) {
          await mockTestRepository.deleteUser(user.id);
        }
      }
    );

    when(
      /^eu faço um POST para "(.*)" com o corpo da requisição sendo um JSON com um objeto user com campo  email "(.*)" e password "(.*)" e um objeto cliente com campo name "(.*)" e cpf "(.*)" e birth_date "(.*)" e phone "(.*)"$/,
      async (url, email, password, name, cpf, birth_date, phone) => {
        response = await request.post(url).send({
          user: { email, password },
          client: { name, cpf, birth_date, phone },
        });
      }
    );

    then(
      /^a resposta deve ser "(.*)" com a mensagem "(.*)"$/,
      (statusCode, message) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
        expect(response.body.error).toBe(message);
      }
    );
  });

  test('Cadastro de Pessoa Juridica com sucesso', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^o PjRepository não tem uma pessoa jurídica com o id "(.*)"$/,
      async (id) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const pj = await mockPjRepository.getPjById(id);

        if (pj) {
          await mockPjRepository.deletePj(id);
        }
      }
    );

    and(
      /^o UserRepository não tem um usuário com o email "(.*)" e senha "(.*)" e type "(.*)"$/,
      async (email, password, type) => {
        const user = await mockTestRepository.getUserByEmail(email);

        if (user) {
          await mockTestRepository.deleteUser(user.id);
        }
      }
    );

    when(
      /^eu faço um POST para "(.*)" com o corpo da requisição sendo um JSON com um objeto user com campo  email "(.*)" e password "(.*)" e um objeto cliente com campo name "(.*)" e cnpj "(.*)" e cep "(.*)" e phone "(.*)" e street "(.*)" e number "(.*)" e state "(.*)" e city "(.*)" e neighborhood "(.*)" e complement "(.*)" e profile_picture "(.*)" e stars '(\d+)'$/,
      async (
        url,
        email,
        password,
        name,
        cnpj,
        cep,
        phone,
        street,
        number,
        state,
        city,
        profile_picture,
        stars
      ) => {
        response = await request.post(url).send({
          user: { email, password },
          client: {
            name,
            cnpj,
            cep,
            phone,
            street,
            number,
            state,
            city,
            neighborhood: 'Centro',
            complement: 'Sala 101',
            profile_picture,
            stars,
          },
        });
      }
    );
    then(
      /^a resposta deve ser "(.*)" com a mensagem "(.*)"$/,
      (statusCode, message) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
        expect(response.body.data).toBe(message);
      }
    );
  });

  test('Falha no cadastro de Pessoa Jurídica por CNPJ inválido', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^o PjRepository não tem uma pessoa jurídica com o id "(.*)"$/,
      async (id) => {
        // Check if the test does not exist in the repository and delete it if it exists
        const pj = await mockPjRepository.getPjById(id);

        if (pj) {
          await mockPjRepository.deletePj(id);
        }
      }
    );

    and(
      /^o UserRepository não tem um usuário com o email "(.*)" e senha "(.*)" e type "(.*)"$/,
      async (email, password, type) => {
        const user = await mockTestRepository.getUserByEmail(email);

        if (user) {
          await mockTestRepository.deleteUser(user.id);
        }
      }
    );

    when(
      /^eu faço um POST para "(.*)" com o corpo da requisição sendo um JSON com um objeto user com campo  email "(.*)" e password "(.*)" e um objeto cliente com campo name "(.*)" e cnpj "(.*)" e cep "(.*)" e phone "(.*)" e street "(.*)" e number "(.*)" e state "(.*)" e city "(.*)" e neighborhood "(.*)" e complement "(.*)" e profile_picture "(.*)" e stars '(\d+)'$/,
      async (
        url,
        email,
        password,
        name,
        cnpj,
        cep,
        phone,
        street,
        number,
        state,
        city,
        profile_picture,
        stars
      ) => {
        response = await request.post(url).send({
          user: { email, password },
          client: {
            name,
            cnpj,
            cep,
            phone,
            street,
            number,
            state,
            city,
            neighborhood: 'Centro',
            complement: 'Sala 101',
            profile_picture,
            stars,
          },
        });
      }
    );
    then(
      /^a resposta deve ser "(.*)" com a mensagem "(.*)"$/,
      (statusCode, message) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
        expect(response.body.error).toBe(message);
      }
    );
  });
});
