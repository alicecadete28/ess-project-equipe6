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
      /^o método getRooms do RoomService retorna um array com o room de id "(.*)", pj_id "(.*)", description "(.*)", type "(.*)", price "(.*)", capacity "(.*)", caracteristics_ids ["(.*)"], local "(.*)", stars "(.*)", ar_condicionado "(.*)", tv "(.*)", wifi "(.*)", petFriendly "(.*)", cafeDaManha "(.*)", estacionamento "(.*)", avaliacao "(.*)"" $/,
      (
        roomId,
        roomPj_id,
        roomDescription,
        roomType,
        roomPrice,
        roomCapacity,
        roomCaracteristics_ids,
        roomLocal,
        roomStars,
        roomAr_condicionado,
        roomTv,
        roomWifi,
        roomPetFriendly,
        roomCafeDaManha,
        roomEstacionamento,
        roomAvaliacao
      ) => {
        mockRoomEntity = new RoomEntity({
          id: roomId,
          pj_id: roomPj_id,
          description: roomDescription,
          type: roomType,
          price: roomPrice,
          capacity: roomCapacity,
          caracteristics_ids: roomCaracteristics_ids,
          local: roomLocal,
          stars: roomStars,
          ar_condicionado: roomAr_condicionado,
          tv: roomTv,
          wifi: roomWifi,
          petFriendly: roomPetFriendly,
          cafeDaManha: roomCafeDaManha,
          estacionamento: roomEstacionamento,
          avaliacao: roomAvaliacao,
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

    then(
      /^o array retornado deve conter o room de id "(.*)", pj_id "(.*)", description "(.*)", type "(.*)", price "(.*)", capacity "(.*)", caracteristics_ids ["(.*)"], local "(.*)", stars "(.*)", ar_condicionado "(.*)", tv "(.*)", wifi "(.*)", petFriendly "(.*)", cafeDaManha "(.*)", estacionamento "(.*)", avaliacao "(.*)"" $/,
      (
        roomId,
        roomPj_id,
        roomDescription,
        roomType,
        roomPrice,
        roomCapacity,
        roomCaracteristics_ids,
        roomLocal,
        roomStars,
        roomAr_condicionado,
        roomTv,
        roomWifi,
        roomPetFriendly,
        roomCafeDaManha,
        roomEstacionamento,
        roomAvaliacao
      ) => {
        mockRoomModel = new RoomModel(
          new RoomEntity({
            id: roomId,
            pj_id: roomPj_id,
            description: roomDescription,
            type: roomType,
            price: roomPrice,
            capacity: roomCapacity,
            caracteristics_ids: roomCaracteristics_ids,
            local: roomLocal,
            stars: roomStars,
            ar_condicionado: roomAr_condicionado,
            tv: roomTv,
            wifi: roomWifi,
            petFriendly: roomPetFriendly,
            cafeDaManha: roomCafeDaManha,
            estacionamento: roomEstacionamento,
            avaliacao: roomAvaliacao,
          })
        );

        expect(rooms).toEqual([mockRoomModel]);
      }
    );
  });

  room('Return room by id', ({ given, when, then }) => {
    given(
      /^o método getRoom chamado com "(.*)" do RoomService retorna um room de id "(.*)", pj_id "(.*)", description "(.*)", type "(.*)", price "(.*)", capacity "(.*)", caracteristics_ids ["(.*)"], local "(.*)", stars "(.*)", ar_condicionado "(.*)", tv "(.*)", wifi "(.*)", petFriendly "(.*)", cafeDaManha "(.*)", etacionamento "(.*)", avaliacao "(.*)"" $/,
      async (
        id,
        roomId,
        roomPj_id,
        roomDescription,
        roomType,
        roomPrice,
        roomCapacity,
        roomCaracteristics_ids,
        roomLocal,
        roomStars,
        roomAr_condicionado,
        roomTv,
        roomWifi,
        roomPetFriendly,
        roomCafeDaManha,
        roomEstacionamento,
        roomAvaliacao
      ) => {
        idToCall = id;

        mockRoomEntity = new RoomEntity({
          id: roomId,
          pj_id: roomPj_id,
          description: roomDescription,
          type: roomType,
          price: roomPrice,
          capacity: roomCapacity,
          caracteristics_ids: roomCaracteristics_ids,
          local: roomLocal,
          stars: roomStars,
          ar_condicionado: roomAr_condicionado,
          tv: roomTv,
          wifi: roomWifi,
          petFriendly: roomPetFriendly,
          cafeDaManha: roomCafeDaManha,
          estacionamento: roomEstacionamento,
          avaliacao: roomAvaliacao,
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

    then(
      /^o room retornado deve ter id "(.*)", pj_id "(.*)", description "(.*)", type "(.*)", price "(.*)", capacity "(.*)", caracteristics_ids ["(.*)"], local "(.*)", stars "(.*)", ar_condicionado "(.*)", tv "(.*)", wifi "(.*)", petFriendly "(.*)", cafeDaManha "(.*)", etacionamento "(.*)", avaliacao "(.*)"" $/,
      (
        roomId,
        roomPj_id,
        roomDescription,
        roomType,
        roomPrice,
        roomCapacity,
        roomCaracteristics_ids,
        roomLocal,
        roomStars,
        roomAr_condicionado,
        roomTv,
        roomWifi,
        roomPetFriendly,
        roomCafeDaManha,
        roomEstacionamento,
        roomAvaliacao
      ) => {
        const roomEntity = new RoomEntity({
          id: roomId,
          pj_id: roomPj_id,
          description: roomDescription,
          type: roomType,
          price: roomPrice,
          capacity: roomCapacity,
          caracteristics_ids: roomCaracteristics_ids,
          local: roomLocal,
          stars: roomStars,
          ar_condicionado: roomAr_condicionado,
          tv: roomTv,
          wifi: roomWifi,
          petFriendly: roomPetFriendly,
          cafeDaManha: roomCafeDaManha,
          estacionamento: roomEstacionamento,
          avaliacao: roomAvaliacao,
        });

        expect(roomReturned).toEqual(roomEntity);
        expect(mockRoomRepository.getRoom).toBeCalledWith(idToCall);
      }
    );
  });
});
