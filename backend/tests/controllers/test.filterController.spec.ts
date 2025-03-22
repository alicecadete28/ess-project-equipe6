import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';
import RoomEntity from '../../src/entities/room.entity';
import { generateToken } from '../utils/generateToken';

describe('FilterController', () => {
  let request = supertest(app);
  let mockRoomRepository: RoomRepository;
  let mockRoomEntity: RoomEntity;

  const dataCheckIn = '2025-02-22';
  const dataCheckOut = '2025-02-25';
  const num_pessoas = 2;
  let token: string;

  beforeAll(async () => {
    token = generateToken();
  });

  beforeEach(() => {
    mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
  });

  it('deve retornar acomodações filtradas', async () => {
    const destino = 'Recife';

    const resposta = await request
      .get('/api/filtrar-acomodacoes')
      .set('Authorization', `Bearer ${token}`)
      .query({
        destino,
        data_ida: dataCheckIn,
        data_volta: dataCheckOut,
        num_pessoas,
      });

    expect(resposta.status).toBe(200);

    expect(resposta.body).toBeInstanceOf(Array<RoomEntity>);

    expect(resposta.body.length).toBeGreaterThan(0);
  });

  it('deve retornar uma mensagem quando nenhuma acomodação corresponder', async () => {
    const resposta = await request
      .get('/api/filtrar-acomodacoes')
      .set('Authorization', `Bearer ${token}`)
      .query({
        destino: 'Recife',
        data_ida: dataCheckIn,
        data_volta: dataCheckOut,
        num_pessoas,
        wifi: true,
      });

    expect(resposta.status).toBe(404);
    expect(resposta.body).toEqual({
      message: 'Nenhuma acomodação atende aos filtros selecionados.',
    });
  });
});

//npx jest --verbose --config ./jest.config.js --detectOpenHandles tests/controllers/test.filterController.spec.ts

///ok
