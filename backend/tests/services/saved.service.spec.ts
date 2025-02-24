import { HttpNotFoundError } from '../../src/utils/errors/http.error';
import SavedService from '../../src/services/saved.service';
import PfRepository from '../../src/repositories/pf.repository';
import PFEntity from '../../src/entities/pf.entity';

describe('SavedService', () => {
  let mockPfRepository: jest.Mocked<Partial<PfRepository>>;
  let service: SavedService;
  let mockPf: PFEntity;

  beforeEach(() => {
    mockPfRepository = {
      getPfById: jest.fn(),
      updatePf: jest.fn(),
    };

    service = new SavedService(mockPfRepository as PfRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the list of saved rooms successfully', async () => {
    mockPf = new PFEntity({
      id: '12732',
      user_id: '1',
      name: 'bia',
      birth_date: new Date(2000, 0, 9),
      cpf: '28173891',
      phone: '98171-2882',
      favorites: ['12', '22', '32'],
      savedRooms: ['101', '202', '303'],
    });
    jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(mockPf);

    const savedRooms = await service.getSaved('12732');

    expect(savedRooms).toEqual(['101', '202', '303']);
    expect(mockPfRepository.getPfById).toBeCalledWith('12732');
  });

  it('should throw an error when retrieving saved rooms from a non-registered user', async () => {
    jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(null);

    await expect(service.getSaved('99999')).rejects.toThrow(HttpNotFoundError);
    expect(mockPfRepository.getPfById).toBeCalledWith('99999');
  });

  it('should update the list of saved rooms successfully', async () => {
    mockPf = new PFEntity({
      id: '12732',
      user_id: '1',
      name: 'bia',
      birth_date: new Date(2000, 0, 9),
      cpf: '28173891',
      phone: '98171-2882',
      favorites: [],
      savedRooms: [],
    });
    jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(mockPf);
    jest.spyOn(mockPfRepository, 'updatePf').mockResolvedValue(mockPf);

    const updatedSavedRooms = await service.updateSaved(['15', '225', '35'], '12732');

    expect(mockPfRepository.getPfById).toBeCalledWith('12732');
    expect(mockPfRepository.updatePf).toBeCalledWith(
      '12732',
      expect.objectContaining({ savedRooms: ['15', '225', '35'] })
    );
    expect(updatedSavedRooms).toEqual(['15', '225', '35']);
  });

  it('should throw an error when updating saved rooms for a non-registered user', async () => {
    jest.spyOn(mockPfRepository, 'getPfById').mockResolvedValue(null);

    await expect(service.updateSaved(['15', '225', '35'], '99999')).rejects.toThrow(HttpNotFoundError);
    expect(mockPfRepository.getPfById).toBeCalledWith('99999');
  });
});
