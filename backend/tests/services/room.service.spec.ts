import RoomEntity from '../../src/entities/room.entity';
import RoomModel from '../../src/models/room.model';
import PjRepository from '../../src/repositories/pj.repository';
import RoomRepository from '../../src/repositories/room.repository';
import RoomService from '../../src/services/room.service';
import { HttpNotFoundError } from '../../src/utils/errors/http.error';

describe('RoomService', () => {
  let mockRoomRepository: RoomRepository;
  let mockPjRepository: PjRepository;
  let service: RoomService;

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

  let mockRoomModel: RoomModel = new RoomModel(mockRoomEntity);

  beforeEach(() => {
    mockRoomRepository = {
      getRooms: jest.fn(),
      getRoom: jest.fn(),
      createRoom: jest.fn(),
      updateRoom: jest.fn(),
      deleteRoom: jest.fn(),
      getRoomsByPj: jest.fn(),
    } as any;

    mockPjRepository = {
      getRoomsByPj: jest.fn(),
    } as any;

    service = new RoomService(mockRoomRepository, mockPjRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return all Rooms', async () => {
    jest
      .spyOn(mockRoomRepository, 'getRooms')
      .mockResolvedValue([mockRoomEntity]);

    const Rooms = await service.getRooms();

    expect(Rooms).toEqual([mockRoomModel]);
    expect(mockRoomRepository.getRooms).toBeCalledTimes(1);
  });

  it('should return a room by id', async () => {
    const id = 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c';

    jest.spyOn(mockRoomRepository, 'getRoom').mockResolvedValue(mockRoomEntity);

    const room = await service.getRoom(id);

    expect(room).toEqual(mockRoomModel);
    expect(mockRoomRepository.getRoom).toBeCalledWith(id);
  });

  it('should return all rooms associated to a pj id', async () => {
    const pj_id = 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c';

    jest
      .spyOn(mockRoomRepository, 'getRoomsByPj')
      .mockResolvedValue([mockRoomEntity]);

    const roomsByPj = await service.getRoomsByPj(pj_id);

    expect(roomsByPj).toEqual([mockRoomModel]);
    expect(mockRoomRepository.getRoomsByPj).toBeCalledWith(pj_id);
  });

  it('should throw an error when room is not found', async () => {
    const id = 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c';

    jest.spyOn(mockRoomRepository, 'getRoom').mockResolvedValue(null);

    await expect(service.getRoom(id)).rejects.toThrow(HttpNotFoundError);
    expect(mockRoomRepository.getRoom).toBeCalledWith(id);
  });

  it('should create a room', async () => {
    jest
      .spyOn(mockRoomRepository, 'createRoom')
      .mockResolvedValue(mockRoomEntity);
    await service.createRoom(mockRoomEntity);

    expect(mockRoomRepository.createRoom).toBeCalledWith(mockRoomEntity);
  });

  it('should update a test', async () => {
    const id = 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c';

    jest
      .spyOn(mockRoomRepository, 'updateRoom')
      .mockResolvedValue(mockRoomEntity);

    const updateRoom = await service.updateRoom(id, mockRoomEntity);

    expect(mockRoomRepository.updateRoom).toBeCalledWith(id, mockRoomEntity);
    expect(updateRoom).toEqual(mockRoomModel);
  });

  it('should delete a test', async () => {
    const id = 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c';
    await service.deleteRoom(id);

    expect(mockRoomRepository.deleteRoom).toBeCalledWith(id);
  });
});
