import { loadFeature, defineFeature } from 'jest-cucumber';
import { AuthService } from '../../src/services/auth.service';
import PfRepository from '../../src/repositories/pf.repository';
import PjRepository from '../../src/repositories/pj.repository';
import UserRepository from '../../src/repositories/user.repository';
import User from '../../src/entities/user.entity';
import PFEntity from '../../src/entities/pf.entity';
import PJEntity from '../../src/entities/pj.entity';

// import TestModel from '../../src/models/test.model';

const feature = loadFeature('tests/features/login-service.feature');

defineFeature(feature, (test) => {
  // mocking the repository
  let mockUserRepository: UserRepository;
  let mockPfRepository: PfRepository;
  let mockPjRepository: PjRepository;

  let service: AuthService;
  let error: any;
  let mockUser: User;
  let mockPf: PFEntity;
  let mockPj: PJEntity;

  let token: string;

  beforeEach(() => {
    mockUserRepository = {
      getUsers: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn,
    } as any;

    mockPfRepository = {
      getPfs: jest.fn(),
      getPfById: jest.fn(),
      getPfByCpf: jest.fn(),
      createPf: jest.fn(),
      updatePf: jest.fn(),
      deletePf: jest.fn,
    } as any;

    mockPjRepository = {
      getPjs: jest.fn(),
      getPjById: jest.fn(),
      getPjByCnpj: jest.fn(),
      createPj: jest.fn(),
      updatePj: jest.fn(),
      deletePj: jest.fn,
    } as any;

    service = new AuthService(
      mockUserRepository,
      mockPfRepository,
      mockPjRepository
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Return token access', ({ given, when, then }) => {
    given(
      /^o método login chamado com "(.*)" e "(.*)" do AuthService retorna um token de acesso$/,
      async (email, password) => {
        mockUser = new User({
          id: '1',
          email,
          password,
          type: 'upf',
        });

        jest
          .spyOn(mockUserRepository, 'getUserByEmail')
          .mockResolvedValue(mockUser);
      }
    );

    when(
      /^o método login do AuthService for chamado com email "(.*)" e password "(.*)"$/,
      async (email, password) => {
        token = await service.login(email, password);
      }
    );

    then(/^o token de acesso retornado deve ser um token de acesso$/, () => {
      expect(token).toEqual(expect.any(String));
    });
  });

  test('throw error when user not found', ({ given, when, then }) => {
    given(
      /^o método login chamado com "(.*)" e "(.*)" do AuthService lança um erro$/,
      async (email, password) => {
        jest
          .spyOn(mockUserRepository, 'getUserByEmail')
          .mockResolvedValue(null);
      }
    );

    when(
      /^o método login do AuthService for chamado com email "(.*)" e password "(.*)"$/,
      async (email, password) => {
        try {
          token = await service.login(email, password);
        } catch (e) {
          error = e;
        }
      }
    );

    then(
      /^o erro retornado deve ser um erro com a mensagem "(.*)"$/,
      (mensagem) => {
        expect(error).toBeDefined();
        expect(error.message).toBe(mensagem);
      }
    );
  });

  test('throw error when password is invalid', ({ given, when, then }) => {
    given(
      /^o método login chamado com "(.*)" e "(.*)" do AuthService lança um erro$/,
      async (email, password) => {
        mockUser = new User({
          id: '1',
          email,
          password,
          type: 'upf',
        });

        jest
          .spyOn(mockUserRepository, 'getUserByEmail')
          .mockResolvedValue(mockUser);
      }
    );

    when(
      /^o método login do AuthService for chamado com email "(.*)" e password "(.*)"$/,
      async (email, password) => {
        try {
          token = await service.login(email, password);
        } catch (e) {
          error = e;
        }
      }
    );

    then(
      /^o erro retornado deve ser um erro com a mensagem "(.*)"$/,
      (mensagem) => {
        expect(error).toBeDefined();
        expect(error.message).toBe(mensagem);
      }
    );
  });

  //   given(
  //     /^o método getTest chamado com "(.*)" do TestService retorna um test de nome "(.*)" e id "(.*)"$/,
  //     async (id, testName, testId) => {
  //       idToCall = id;

  //       mockTestEntity = new TestEntity({
  //         id: testId,
  //         name: testName,
  //       });

  //       jest
  //         .spyOn(mockTestRepository, 'getTest')
  //         .mockResolvedValue(mockTestEntity);
  //     }
  //   );

  //   when(
  //     /^o método getTest do TestService for chamado com o id "(.*)"$/,
  //     async (testId) => {
  //       testReturned = await service.getTest(testId);
  //     }
  //   );

  //   then(
  //     /^o test retornado deve ter o nome "(.*)" e id "(.*)"$/,
  //     (testName, testId) => {
  //       const testEntity = new TestEntity({ id: testId, name: testName });

  //       expect(testReturned).toEqual(testEntity);
  //       expect(mockTestRepository.getTest).toBeCalledWith(idToCall);
  //     }
  //   );
  // });
});
