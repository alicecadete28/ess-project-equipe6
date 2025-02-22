import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import RoomService from '../../src/services/room.service';
import RoomRepository from '../../src/repositories/room.repository';
import PjRepository from '../../src/repositories/pj.repository'; // ✅ Importando PjRepository
import FilterService from '../../src/services/filter.service';
import { filtrarAcomodacoes } from '../../src/controllers/filter.controller';

jest.mock('../../src/services/room.service');
jest.mock('../../src/repositories/room.repository');
jest.mock('../../src/repositories/pj.repository'); // ✅ Mockando PjRepository
jest.mock('../../src/services/filter.service');

import RoomEntity from '../../src/entities/room.entity';

const mockRooms: RoomEntity[] = [
    new RoomEntity({
        id: '1',
        pj_id: 'PJ123',
        description: 'Quarto confortável',
        type: 'deluxe',
        price: 200,
        capacity: 2,
        caracteristics_ids: [],
        local: 'Recife, PE',
        stars: 4.5,
        ar_condicionado: true,
        tv: true,
        wifi: true,
        petFriendly: true,
        cafeDaManha: true,
        estacionamento: true,
        avaliacao: 9.0,
    }),
    new RoomEntity({
        id: '2',
        pj_id: 'PJ456',
        description: 'Quarto simples',
        type: 'standard',
        price: 150,
        capacity: 1,
        caracteristics_ids: [],
        local: 'Recife, PE',
        stars: 3.8,
        ar_condicionado: false,
        tv: false,
        wifi: false,
        petFriendly: false,
        cafeDaManha: false,
        estacionamento: false,
        avaliacao: 7.5,
    }),
];

describe('filtrarAcomodacoes', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    let sendMock: jest.Mock;
    let mockRoomService: jest.Mocked<RoomService>;
    let mockRoomRepository: jest.Mocked<RoomRepository>;
    let mockPjRepository: jest.Mocked<PjRepository>; // ✅ Criando mock do PjRepository

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnThis();
        sendMock = jest.fn();

        mockResponse = {
            json: jsonMock,
            status: statusMock,
            send: sendMock,
        };

        mockRoomRepository = new RoomRepository() as jest.Mocked<RoomRepository>;
        mockPjRepository = new PjRepository() as jest.Mocked<PjRepository>; // ✅ Criando instância mockada

        mockRoomService = new RoomService(mockRoomRepository, mockPjRepository) as jest.Mocked<RoomService>; // ✅ Passando ambos os repositórios
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('deve retornar quartos filtrados corretamente', async () => {
        mockRequest = {
            query: {
                destino: 'Recife',
                data_ida: '2025-06-01',
                data_volta: '2025-06-10',
                num_pessoas: '2',
                ar_condicionado: 'true',
            },
        };

        jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockResolvedValue(mockRooms);
        jest.spyOn(FilterService, 'filtrarAcomodacoes').mockReturnValue([mockRooms[0]]);

        await filtrarAcomodacoes(mockRequest as Request, mockResponse as Response);

        expect(RoomService.prototype.buscarAcomodacoes).toHaveBeenCalledWith(
            'Recife',
            parseISO('2025-06-01'),
            parseISO('2025-06-10'),
            2
        );
        expect(FilterService.filtrarAcomodacoes).toHaveBeenCalledWith(mockRooms, { ar_condicionado: 'true' });
        expect(jsonMock).toHaveBeenCalledWith([mockRooms[0]]);
    });

    it('deve retornar erro 500 se ocorrer uma exceção', async () => {
        mockRequest = {
            query: {
                destino: 'Recife',
                data_ida: '2025-06-01',
                data_volta: '2025-06-10',
                num_pessoas: '2',
            },
        };

        jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockRejectedValue(new Error('Erro ao buscar acomodações'));

        await filtrarAcomodacoes(mockRequest as Request, mockResponse as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Erro ao buscar acomodações no banco de dados.' });
    });
});


// npx jest --verbose --config ./jest.config.js --detectOpenHandles tests/services/test.filterService.spec.ts
/// ok