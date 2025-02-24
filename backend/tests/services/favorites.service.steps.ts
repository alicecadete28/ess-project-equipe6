import { loadFeature, defineFeature } from 'jest-cucumber';
import FavoriteService from '../../src/services/favorite.service';
import PfRepository from '../../src/repositories/pf.repository';
import PFEntity from '../../src/entities/pf.entity';
import { HttpNotFoundError } from '../../src/utils/errors/http.error';

const feature = loadFeature('tests/features/favorites.service.feature');

defineFeature(feature, (test) => {
  let mockPfRepository: PfRepository;
  let service: FavoriteService;
  let error: any;
  let mockPf: PFEntity;
  let response: string[];

  beforeEach(() => {
    mockPfRepository = {
      getPfById: jest.fn(),
      updatePf: jest.fn(),
    } as any;

    service = new FavoriteService(mockPfRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Recuperar a lista de favoritos com sucesso', ({ given, when, then }) => {
    given(/^o PfRepository tem um usuário com id "(.*)"$/, async (id) => {
      mockPf = new PFEntity({
        id,
        user_id: '1',
        name: 'bia',
        birth_date: new Date(2000, 0, 9),
        cpf: '28173891',
        phone: '98171-2882',
        favorites: ['12', '22', '32'],
        savedRooms: [''],
      });
      jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(mockPf);
    });

    when(/^eu chamar o método getFavorites com id "(.*)"$/, async (id) => {
      response = await service.getFavorites(id);
    });

    then('a resposta deve conter a lista de favoritos do usuário', () => {
      expect(response).toEqual(['12', '22', '32']);
    });
  });

  test('Falha ao recuperar a lista de favoritos de um usuário não cadastrado', ({ given, when, then }) => {
    given(/^o PfRepository não tem um usuário com id "(.*)"$/, async (id) => {
      jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(null);
    });

    when(/^eu chamar o método getFavorites com id "(.*)"$/, async (id) => {
      try {
        response = await service.getFavorites(id);
      } catch (e) {
        error = e;
      }
    });

    then(/^uma exceção HttpNotFoundError deve ser lançada com a mensagem "(.*)"$/, (mensagem) => {
      expect(error).toBeInstanceOf(HttpNotFoundError);
      expect(error.message).toBe(mensagem);
    });
  });

  test('Atualizar a lista de favoritos com sucesso', ({ given, when, then }) => {
    given(/^o PfRepository tem um usuário com id "(.*)"$/, async (id) => {
      mockPf = new PFEntity({
        id,
        user_id: '1',
        name: 'bia',
        birth_date: new Date(2000, 0, 9),
        cpf: '28173891',
        phone: '98171-2882',
        favorites: ['12', '22', '32'],
        savedRooms: [''],
      });
      jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(mockPf);
      jest.spyOn(mockPfRepository, 'updatePf').mockResolvedValue(mockPf);
    });

    when(/^eu chamar o método updateFavorite com a nova lista \[(.*)] e id "(.*)"$/, async (newFavorites, id) => {
      response = await service.updateFavorite(newFavorites.split(', '), id);
    });

    then(/^a resposta deve conter a nova lista de favoritos \[(.*)]$/, (newFavorites) => {
      expect(response).toEqual(newFavorites.split(', '));
    });
  });

  test('Falha ao atualizar a lista de favoritos de um usuário não cadastrado', ({ given, when, then }) => {
    given(/^o PfRepository não tem um usuário com id "(.*)"$/, async (id) => {
      jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(null);
    });

    when(/^eu chamar o método updateFavorite com a nova lista \[(.*)] e id "(.*)"$/, async (newFavorites, id) => {
      try {
        response = await service.updateFavorite(newFavorites.split(', '), id);
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
