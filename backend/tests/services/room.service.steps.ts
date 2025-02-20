import { loadFeature, defineFeature } from 'jest-cucumber';
import RoomRepository from '../../src/repositories/room.repository';
import RoomEntity from '../../src/entities/room.entity';
import RoomService from '../../src/services/room.service';
import PjRepository from '../../src/repositories/pj.repository';
import RoomModel from '../../src/models/room.model';

const feature = loadFeature('tests/features/room-service.feature');

defineFeature(feature, (room) => {
  // mocking the repository
  let mockRoomRepository: RoomRepository;
  let mockPjRepository: PjRepository;
  let service: RoomService;

  let rooms: RoomEntity[];
  let roomReturned: RoomEntity;
  let idToCall: string;

  let mockRoomEntity: RoomEntity;
  let mockRoomModel: RoomModel;

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

  room('Return all rooms', ({ given, when, then }) => {
    given(
      'o método getRooms do RoomsService retorna um array com o seguinte quarto:',
      (table) => {
        mockRoomEntity = new RoomEntity({
          id: table[0],
          pj_id: table[1],
          description: table[2],
          type: table[3],
          price: table[4],
          capacity: table[5],
          caracteristics_ids: table[6],
          local: table[7],
          stars: table[8],
          ar_condicionado: table[9],
          tv: table[10],
          wifi: table[11],
          petFriendly: table[12],
          cafeDaManha: table[13],
          estacionamento: table[14],
          avaliacao: table[15],
        });

        console.log('mock entity', mockRoomEntity);

        jest
          .spyOn(mockRoomRepository, 'getRooms')
          .mockResolvedValue([mockRoomEntity]);
      }
    );

    when('o método getRooms do RoomService for chamado', async () => {
      rooms = await service.getRooms();

      //getRooms retorna:
      console.log('rooms', rooms);
    });

    then('o array retornado deve conter o seguinte quarto:', (table) => {
      mockRoomModel = new RoomModel(
        new RoomEntity({
          id: table[0],
          pj_id: table[1],
          description: table[2],
          type: table[3],
          price: table[4],
          capacity: table[5],
          caracteristics_ids: table[6],
          local: table[7],
          stars: table[8],
          ar_condicionado: table[9],
          tv: table[10],
          wifi: table[11],
          petFriendly: table[12],
          cafeDaManha: table[13],
          estacionamento: table[14],
          avaliacao: table[15],
        })
      );
      console.log('mockroomModel:', mockRoomModel);

      expect(rooms).toEqual([mockRoomModel]);
    });
  });

  room('Return room by id', ({ given, when, then }) => {
    given(
      /^o método getRoom chamado com "(.*)" do RoomService retorna o seguinte quarto:$/,
      (arg0, table) => {
        idToCall = arg0;

        mockRoomEntity = new RoomEntity({
          id: table[0],
          pj_id: table[1],
          description: table[2],
          type: table[3],
          price: table[4],
          capacity: table[5],
          caracteristics_ids: table[6],
          local: table[7],
          stars: table[8],
          ar_condicionado: table[9],
          tv: table[10],
          wifi: table[11],
          petFriendly: table[12],
          cafeDaManha: table[13],
          estacionamento: table[14],
          avaliacao: table[15],
        });

        jest
          .spyOn(mockRoomRepository, 'getRoom')
          .mockResolvedValue(mockRoomEntity);
      }
    );

    when(
      /^o método getRoom do RoomService for chamado com o id "(.*)"$/,
      async (roomId) => {
        roomReturned = await service.getRoom(roomId);
      }
    );

    then('o quarto retornado deve ter os seguintes atributos:', (table) => {
      const roomEntity = new RoomEntity({
        id: table[0],
        pj_id: table[1],
        description: table[2],
        type: table[3],
        price: table[4],
        capacity: table[5],
        caracteristics_ids: table[6],
        local: table[7],
        stars: table[8],
        ar_condicionado: table[9],
        tv: table[10],
        wifi: table[11],
        petFriendly: table[12],
        cafeDaManha: table[13],
        estacionamento: table[14],
        avaliacao: table[15],
      });

      expect(roomReturned).toEqual(roomEntity);
      expect(mockRoomRepository.getRoom).toBeCalledWith(idToCall);
    });
  });
});
