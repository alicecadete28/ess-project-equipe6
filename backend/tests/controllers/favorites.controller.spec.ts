import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import PfRepository from '../../src/repositories/pf.repository';
import PFEntity from '../../src/entities/pf.entity';
import { generateToken } from '../utils/generateToken';

describe('FavoritesController', () => {
  let request = supertest(app);
  let mockPfRepository: PfRepository;

  let mockPfEntity: PFEntity = new PFEntity({
    id: '12732',
    user_id: '1',
    name: 'bia',
    birth_date: new Date(2000, 0, 9),
    cpf: '28173891',
    phone: '98171-2882',
    favorites: ['12', '22', '32'],
    savedRooms: ['12', '222', '32'],
  });

  let token: string;

  beforeAll(async () => {
    token = generateToken();
  });

  beforeEach(() => {
    mockPfRepository = di.getRepository<PfRepository>(PfRepository);
  });

  it('should return a favorites by id', async () => {
    const createdPfEntity = await mockPfRepository.createPf(mockPfEntity);

    const response = await request
      .get(`/api/favorites/${createdPfEntity.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(createdPfEntity.favorites);
  });

  it('should throw an error when Pf is not found', async () => {
    const response = await request
      .get(`/api/favorites/02`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msgCode).toEqual('Pf_not_found');
  });

  /* it('should create a Pf', async () => {
      const response = await request.post('/api/favorites').send(mockPfEntity);
  
      expect(response.status).toBe(200);
  
      expect(response.body.data).toEqual(
        expect.objectContaining({
          id: mockPfEntity.id,
          user_id: mockPfEntity.user_id,
          name: mockPfEntity.name,
          birth_date: mockPfEntity.birth_date,
          cpf: mockPfEntity.cpf,
          phone: mockPfEntity.phone,
          favorites: mockPfEntity.favorites,
          savedRooms: mockPfEntity.savedRooms,
        })
      );
    });
  */
  it('should update favorites', async () => {
    const createdPfEntity = await mockPfRepository.createPf(mockPfEntity);

    const response = await request
      .patch(`/api/favorites/${createdPfEntity.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: '12732',
        user_id: '1',
        name: 'bia',
        birth_date: new Date(2000, 0, 9),
        cpf: '28173891',
        phone: '98171-2882',
        favorites: ['12', '22', '32'],
        savedRooms: ['12', '222'],
      });
    const createdPf = response.body.data;
    expect(response.status).toBe(200);
    expect(createdPf).toEqual(
      expect.objectContaining(createdPfEntity.favorites)
    );
  });

  /*it('should delete a test', async () => {
      const createdPfEntity = await mockPfRepository.createPf(
        mockPfEntity
      );
  
      const response = await request.delete(`/api/saved/${createdPfEntity.id}`);
  
      const deletedPfEntity = await mockPfRepository.getPfById(
        createdPfEntity.id
      );
      expect(response.status).toBe(200);
      expect(deletedPfEntity).toBeNull();
    });
    */
});
