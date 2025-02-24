import { loadFeature, defineFeature } from 'jest-cucumber';
import SavedService from '../../src/services/saved.service';
import PfRepository from '../../src/repositories/pf.repository';
import PFEntity from '../../src/entities/pf.entity';
import { HttpNotFoundError } from '../../src/utils/errors/http.error';

const feature = loadFeature('tests/features/saved.service.feature');

defineFeature(feature, (test) => {
  let mockPfRepository: PfRepository;
  let service: SavedService;
  let error: any;
  let mockPf: PFEntity;
  let response: string[];

  beforeEach(() => {
    mockPfRepository = {
      getPfById: jest.fn(),
      updatePf: jest.fn(),
    } as any;

    service = new SavedService(mockPfRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Recuperar a lista de salvos com sucesso', ({ given, when, then }) => {
    given(/^o PfRepository tem um usuário com id "(.*)"$/, async (id) => {
      mockPf = new PFEntity({
        id,
        user_id: '1',
        name: 'bia',
        birth_date: new Date(2000, 0, 9),
        cpf: '28173891',
        phone: '98171-2882',
        savedRooms: ['101', '202', '303'],
        favorites: [''],
      });
      jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(mockPf);
    });

    when(/^eu chamar o método getSaved com id "(.*)"$/, async (id) => {
      response = await service.getSaved(id);
    });

    then('a resposta deve conter a lista de salvos do usuário', () => {
      expect(response).toEqual(['101', '202', '303']);
    });
  });

  test('Falha ao recuperar a lista de salvos de um usuário não cadastrado', ({ given, when, then }) => {
    given(/^o PfRepository não tem um usuário com id "(.*)"$/, async (id) => {
      jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(null);
    });

    when(/^eu chamar o método getSaved com id "(.*)"$/, async (id) => {
      try {
        response = await service.getSaved(id);
      } catch (e) {
        error = e;
      }
    });

    then(/^uma exceção HttpNotFoundError deve ser lançada com a mensagem "(.*)"$/, (mensagem) => {
      expect(error).toBeInstanceOf(HttpNotFoundError);
      expect(error.message).toBe(mensagem);
    });
  });

  test('Atualizar a lista de salvos com sucesso', ({ given, when, then }) => {
    given(/^o PfRepository tem um usuário com id "(.*)"$/, async (id) => {
      mockPf = new PFEntity({
        id,
        user_id: '1',
        name: 'bia',
        birth_date: new Date(2000, 0, 9),
        cpf: '28173891',
        phone: '98171-2882',
        savedRooms: ['101', '202', '303'],
        favorites: [''],
      });
      jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(mockPf);
      jest.spyOn(mockPfRepository, 'updatePf').mockResolvedValue(mockPf);
    });

    when(/^eu chamar o método updateSaved com a nova lista \[(.*)] e id "(.*)"$/, async (newSavedRooms, id) => {
      response = await service.updateSaved(newSavedRooms.split(', '), id);
    });

    then(/^a resposta deve conter a nova lista de salvos \[(.*)]$/, (newSavedRooms) => {
      expect(response).toEqual(newSavedRooms.split(', '));
    });
  });

  test('Falha ao atualizar a lista de salvos de um usuário não cadastrado', ({ given, when, then }) => {
    given(/^o PfRepository não tem um usuário com id "(.*)"$/, async (id) => {
      jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(null);
    });

    when(/^eu chamar o método updateSaved com a nova lista \[(.*)] e id "(.*)"$/, async (newSavedRooms, id) => {
      try {
        response = await service.updateSaved(newSavedRooms.split(', '), id);
      } catch (e) {
        error = e;
      }
    });

    then(/^uma exceção HttpNotFoundError deve ser lançada com a mensagem "(.*)"$/, (mensagem) => {
      expect(error).toBeInstanceOf(HttpNotFoundError);
      expect(error.message).toBe(mensagem);
    });
  });
});
