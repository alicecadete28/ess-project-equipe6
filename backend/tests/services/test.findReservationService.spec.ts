import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import RoomService from '../../src/services/room.service';
import RoomRepository from '../../src/repositories/room.repository';
import ReservationRepository from '../../src/repositories/findReservation.repository';
import { buscarAcomodacoes } from '../../src/controllers/findReservation.controller';

jest.mock('../../src/services/room.service');
jest.mock('../../src/repositories/room.repository');
jest.mock('../../src/repositories/findReservation.repository');

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
];

describe('buscarAcomodacoes', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    let sendMock: jest.Mock;
    let buscarAcomodacoesMock: jest.MockedFunction<RoomService['buscarAcomodacoes']>;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnThis();
        sendMock = jest.fn();

        mockResponse = {
            json: jsonMock,
            status: statusMock,
            send: sendMock,
        };

        buscarAcomodacoesMock = jest.spyOn(RoomService.prototype, 'buscarAcomodacoes') as jest.MockedFunction<RoomService['buscarAcomodacoes']>;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('deve retornar quartos disponíveis corretamente', async () => {
        mockRequest = {
            query: {
                destino: 'Recife',
                data_ida: '2025-06-01',
                data_volta: '2025-06-10',
                num_pessoas: '2',
            },
        };

        buscarAcomodacoesMock.mockResolvedValue(mockRooms);

        await buscarAcomodacoes(mockRequest as Request, mockResponse as Response);

        const expectedCheckIn = new Date('2025-06-01T00:00:00.000Z');
        const expectedCheckOut = new Date('2025-06-10T00:00:00.000Z');

        expect(buscarAcomodacoesMock).toHaveBeenCalledWith(
            'Recife',
            expect.any(Date),
            expect.any(Date),
            2
        );
        expect(buscarAcomodacoesMock.mock.calls[0][1].toISOString()).toBe(expectedCheckIn.toISOString());
        expect(buscarAcomodacoesMock.mock.calls[0][2].toISOString()).toBe(expectedCheckOut.toISOString());
        expect(jsonMock).toHaveBeenCalledWith(mockRooms);
    });

    it('deve retornar erro 404 quando nenhuma acomodação for encontrada', async () => {
        mockRequest = {
            query: {
                destino: 'Recife',
                data_ida: '2025-06-01',
                data_volta: '2025-06-10',
                num_pessoas: '2',
            },
        };

        buscarAcomodacoesMock.mockResolvedValue([]);

        await buscarAcomodacoes(mockRequest as Request, mockResponse as Response);

        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Não há acomodações disponíveis no destino e nas datas pesquisadas." });

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

        jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockImplementationOnce(() => {
            throw new Error('Erro ao buscar acomodações');
        });
        
        await buscarAcomodacoes(mockRequest as Request, mockResponse as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Erro ao buscar acomodações no banco de dados.' });


    // Verifica se a resposta JSON com mensagem de erro foi chamada
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Erro ao buscar acomodações no banco de dados.' });
    });
});

//npx jest --verbose --config ./jest.config.js --detectOpenHandles tests/services/test.findReservationService.spec.ts

//ok