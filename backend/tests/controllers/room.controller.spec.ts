import supertest from 'supertest';
import RoomEntity from '../../src/entities/room.entity';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';

describe('RoomController', () => {
  let request = supertest(app);
  let mockRoomRepository: RoomRepository;

  let mockRoomEntity: RoomEntity = new RoomEntity({
    id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c',
    pj_id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d',
    description: 'Room Seed',
    type: 'Seed',
    price: 100,
    capacity: 2,
    caracteristics_ids: ['Seed'],
    local: 'Recife',
    stars: 5,
    ar_condicionado: true,
    tv: true,
    wifi: true,
    petFriendly: true,
    cafeDaManha: true,
    estacionamento: true,
    avaliacao: 5,
  });

  beforeEach(() => {
    mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
  });

  it('should return a room by id', async () => {
    const createdRoomEntity = await mockRoomRepository.createRoom(
      mockRoomEntity
    );

    const response = await request.get(`/api/rooms/${createdRoomEntity.id}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(createdRoomEntity);
  });

  it('should throw an error when room is not found', async () => {
    const response = await request.get(`/api/rooms/02`);

    expect(response.status).toBe(404);
    expect(response.body.msgCode).toEqual('room_not_found');
  });

  it('should create a room', async () => {
    const response = await request.post('/api/rooms').send(mockRoomEntity);

    expect(response.status).toBe(200);
    const createdRoom = response.body.data;
    expect(createdRoom).toEqual(
      expect.objectContaining({
        id: createdRoom.id,
        pj_id: mockRoomEntity.pj_id,
        description: mockRoomEntity.description,
        type: mockRoomEntity.type,
        price: mockRoomEntity.price,
        capacity: mockRoomEntity.capacity,
        caracteristics_ids: mockRoomEntity.caracteristics_ids,
        local: mockRoomEntity.local,
        stars: mockRoomEntity.stars,
        ar_condicionado: mockRoomEntity.ar_condicionado,
        tv: mockRoomEntity.tv,
        wifi: mockRoomEntity.wifi,
        petFriendly: mockRoomEntity.petFriendly,
        cafeDaManha: mockRoomEntity.cafeDaManha,
        estacionamento: mockRoomEntity.estacionamento,
        avaliacao: mockRoomEntity.avaliacao,
      })
    );
  });

  it('should update a room', async () => {
    const createdRoomEntity = await mockRoomRepository.createRoom(
      mockRoomEntity
    );

    const response = await request
      .put(`/api/rooms/${createdRoomEntity.id}`)
      .send({
        id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c',
        pj_id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d',
        description: 'Room Malibu',
        type: 'Seed',
        price: 100,
        capacity: 2,
        caracteristics_ids: ['Seed'],
        local: 'Recife',
        stars: 5,
        ar_condicionado: true,
        tv: true,
        wifi: true,
        petFriendly: true,
        cafeDaManha: true,
        estacionamento: true,
        avaliacao: 5,
      });
    const createdRoom = response.body.data;
    expect(response.status).toBe(200);
    expect(createdRoom).toEqual(
      expect.objectContaining({
        id: createdRoom.id,
        pj_id: mockRoomEntity.pj_id,
        description: 'Room Malibu',
        type: mockRoomEntity.type,
        price: mockRoomEntity.price,
        capacity: mockRoomEntity.capacity,
        caracteristics_ids: mockRoomEntity.caracteristics_ids,
        local: mockRoomEntity.local,
        stars: mockRoomEntity.stars,
        ar_condicionado: mockRoomEntity.ar_condicionado,
        tv: mockRoomEntity.tv,
        wifi: mockRoomEntity.wifi,
        petFriendly: mockRoomEntity.petFriendly,
        cafeDaManha: mockRoomEntity.cafeDaManha,
        estacionamento: mockRoomEntity.estacionamento,
        avaliacao: mockRoomEntity.avaliacao,
      })
    );
  });

  it('should delete a room', async () => {
    const createdRoomEntity = await mockRoomRepository.createRoom(
      mockRoomEntity
    );

    const response = await request.delete(`/api/rooms/${createdRoomEntity.id}`);

    const deletedRoomEntity = await mockRoomRepository.getRoom(
      createdRoomEntity.id
    );
    expect(response.status).toBe(200);
    expect(deletedRoomEntity).toBeNull();
  });
});
