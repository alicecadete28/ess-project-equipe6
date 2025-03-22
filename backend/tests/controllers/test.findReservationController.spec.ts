import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';
import FilterService from '../../src/services/filter.service';
import RoomService from '../../src/services/room.service';
import { addDays } from 'date-fns';
import PjRepository from '../../src/repositories/pj.repository'; // Ajuste o caminho conforme necessário
import RoomEntity from '../../src/entities/room.entity';
import { mock } from 'node:test';
import { generateToken } from '../utils/generateToken';

describe('FindReservationController', () => {
  let request = supertest(app);
  let mockRoomRepository: RoomRepository;
  let mockPjRepository: PjRepository;
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
    mockPjRepository = di.getRepository<PjRepository>(PjRepository);
  });

  it('deve retornar acomodações disponíveis', async () => {
    const destino = 'Recife';

    mockRoomEntity = new RoomEntity({
      id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c',
      pj_id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d',
      description: 'Room Seed',
      price: 100,
      type: 'Seed',
      capacity: 2,
      caracteristics_ids: ['Seed'],
      local: 'Recife',
      stars: 5,
      ar_condicionado: true,
      tv: true,
      wifi: false,
      petFriendly: true,
      cafeDaManha: true,
      estacionamento: true,
      avaliacao: 5,
    });

    await mockRoomRepository.createRoom(mockRoomEntity);

    const resposta = await request
      .get('/api/buscar-acomodacoes')
      .set('Authorization', `Bearer ${token}`)
      .query({
        destino,
        data_ida: dataCheckIn,
        data_volta: dataCheckOut,
        num_pessoas,
      });

    expect(resposta.status).toBe(200);
    expect(resposta.body).toBeInstanceOf(Array<RoomEntity>);
  });

  it('deve retornar erro quando destino não é fornecido', async () => {
    const resposta = await request
      .get('/api/buscar-acomodacoes')
      .set('Authorization', `Bearer ${token}`)
      .query({
        data_ida: dataCheckIn,
        data_volta: dataCheckOut,
        num_pessoas,
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ error: 'O destino é obrigatório.' });
  });

  it('deve retornar mensagem quando não houver acomodações disponíveis', async () => {
    const resposta = await request
      .get('/api/buscar-acomodacoes')
      .set('Authorization', `Bearer ${token}`)
      .query({
        destino: 'Saõ paulo',
        data_ida: dataCheckIn,
        data_volta: dataCheckOut,
        num_pessoas,
      });

    expect(resposta.status).toBe(404);
    expect(resposta.body).toEqual({
      message:
        'Não há acomodações disponíveis no destino e nas datas pesquisadas.',
    });
  });

  it('deve retornar erro para datas inválidas', async () => {
    const resposta = await request
      .get('/api/buscar-acomodacoes')
      .set('Authorization', `Bearer ${token}`)
      .query({
        destino: 'Recife',
        data_ida: 'data-invalida',
        data_volta: 'dsad',
        num_pessoas,
      });
    console.log(resposta);
    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ message: 'Data de ida inválida.' });
  });
});

// npx jest --verbose --coverage  --config ./jest.config.js --detectOpenHandles ./tests/controllers/test.findReservationController.spec.ts

// ok
