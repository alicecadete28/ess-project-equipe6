import { HttpNotFoundError } from '../../src/utils/errors/http.error';
import FavoriteService from '../../src/services/favorite.service';
import PfRepository from '../../src/repositories/pf.repository';
import PFEntity from '../../src/entities/pf.entity';

describe('FavoriteService', () => {
  let mockPfRepository : jest.Mocked<Partial<PfRepository>>;
  let service: FavoriteService;
  let mockPf: PFEntity;

  beforeEach(() => {
    mockPfRepository = {
      getPfById: jest.fn(),
      updatePf: jest.fn(),
    };

    service = new FavoriteService(mockPfRepository as PfRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the list of favorites successfully', async () => {
    mockPf = new PFEntity({
        id: '12732',
        user_id: '1',
        name: 'bia',
        birth_date: new Date(2000, 0, 9),
        cpf: '28173891',
        phone: '98171-2882',
        favorites: ['12', '22', '32'],
        savedRooms: ['12', '222', '32'],
    });
    jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(mockPf);

    const favorites = await service.getFavorites('12732');

    expect(favorites).toEqual(['12', '22', '32']);
    expect(mockPfRepository.getPfById).toBeCalledWith('12732');
  });

  it('should throw an error when retrieving favorites from a non-registered user', async () => {
    jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(null);

    await expect(service.getFavorites('99999')).rejects.toThrow(HttpNotFoundError);
    expect(mockPfRepository.getPfById).toBeCalledWith('99999');
  });

  it('should update the list of favorites successfully', async () => {
    mockPf = new PFEntity({ id: '12732', user_id: '1', name: 'bia',
    birth_date: new Date(2000, 0, 9), cpf: '28173891', phone: '98171-2882',
    favorites: [], savedRooms: [] });
    jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(mockPf);
    jest.spyOn(mockPfRepository, 'updatePf').mockResolvedValue(mockPf);

    const updatedFavorites = await service.updateFavorite(['15', '225', '35'], '12732');

    expect(mockPfRepository.getPfById).toBeCalledWith('12732');
    expect(mockPfRepository.updatePf).toBeCalledWith('12732', expect.objectContaining({ favorites: ['15', '225', '35'] }));
    expect(updatedFavorites).toEqual(['15', '225', '35']);
  });

  it('should throw an error when updating favorites for a non-registered user', async () => {
    jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(null);

    await expect(service.updateFavorite(['15', '225', '35'], '99999')).rejects.toThrow(HttpNotFoundError);
    expect(mockPfRepository.getPfById).toBeCalledWith('99999');
  });
});
