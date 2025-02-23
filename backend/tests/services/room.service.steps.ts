import { loadFeature, defineFeature } from 'jest-cucumber';
import RoomRepository from '../../src/repositories/room.repository';
import RoomEntity from '../../src/entities/room.entity';
import RoomService from '../../src/services/room.service';
import PjRepository from '../../src/repositories/pj.repository';
import RoomModel from '../../src/models/room.model';
import ReservationRepository from '../../src/repositories/reservation.repository';

const feature = loadFeature('tests/features/room-service.feature');

defineFeature(feature, (room) => {
  // mocking the repository
  let mockRoomRepository: RoomRepository;
  let mockPjRepository: PjRepository;
  let service: RoomService;
  let mockReservationRepository: ReservationRepository;

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

    mockReservationRepository = {
      getReservations: jest.fn(),
      getReservation: jest.fn(),
      getReservationsByPf: jest.fn(),
    } as any;

    service = new RoomService(
      mockRoomRepository,
      mockPjRepository,
      mockReservationRepository
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  room('Return all rooms', ({ given, when, then }) => {
    given(
      'o método getRooms do RoomsService retorna um array com o seguinte quarto:',
      (table) => {
        const requestBody = table.reduce(
          (
            acc: { [x: string]: any },
            row: { campo: string | number; var: string }
          ) => {
            acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
            return acc;
          },
          {}
        );

        jest
          .spyOn(mockRoomRepository, 'getRooms')
          .mockResolvedValue([requestBody]);
      }
    );

    when('o método getRooms do RoomService for chamado', async () => {
      rooms = await service.getRooms();

      //getRooms retorna:
    });

    then('o array retornado deve conter o seguinte quarto:', (table) => {
      const requestBody = table.reduce(
        (
          acc: { [x: string]: any },
          row: { campo: string | number; var: string }
        ) => {
          acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
          return acc;
        },
        {}
      );

      expect(rooms).toEqual([requestBody]);
    });
  });

  room('Return room by id', ({ given, when, then }) => {
    given(
      /^o método getRoom chamado com "(.*)" do RoomService retorna o seguinte quarto:$/,
      (arg0, table) => {
        idToCall = arg0;
        const requestBody = table.reduce(
          (
            acc: { [x: string]: any },
            row: { campo: string | number; var: string }
          ) => {
            acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
            return acc;
          },
          {}
        );

        jest
          .spyOn(mockRoomRepository, 'getRoom')
          .mockResolvedValue(requestBody);
      }
    );

    when(
      /^o método getRoom do RoomService for chamado com o id "(.*)"$/,
      async (roomId) => {
        roomReturned = await service.getRoom(roomId);
      }
    );

    then('o quarto retornado deve ter os seguintes atributos:', (table) => {
      const requestBody = table.reduce(
        (
          acc: { [x: string]: any },
          row: { campo: string | number; var: string }
        ) => {
          acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
          return acc;
        },
        {}
      );

      expect(roomReturned).toEqual(requestBody);
      expect(mockRoomRepository.getRoom).toBeCalledWith(idToCall);
    });
  });
  room('Return rooms by the pj id', ({ given, when, then }) => {
    given(
      /^o método getRoomsByPj chamado com "(.*)" do RoomService retorna o seguinte quarto:$/,
      (arg0, table) => {
        idToCall = arg0;
        const requestBody = table.reduce(
          (
            acc: { [x: string]: any },
            row: { campo: string | number; var: string }
          ) => {
            acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
            return acc;
          },
          {}
        );

        jest
          .spyOn(mockRoomRepository, 'getRoomsByPj')
          .mockResolvedValue([requestBody]);
      }
    );

    when(
      /^o método getRoomsByPj do RoomService for chamado com o id "(.*)"$/,
      async (roomId) => {
        rooms = await service.getRoomsByPj(roomId);
      }
    );

    then('o quarto retornado deve ter os seguintes atributos:', (table) => {
      const requestBody = table.reduce(
        (
          acc: { [x: string]: any },
          row: { campo: string | number; var: string }
        ) => {
          acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
          return acc;
        },
        {}
      );

      expect(roomReturned).toEqual(requestBody);
      expect(mockRoomRepository.getRoomsByPj).toBeCalledWith(idToCall);
    });
  });
});
