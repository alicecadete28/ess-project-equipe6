import { loadFeature, defineFeature } from 'jest-cucumber';
import { Request, Response } from 'express';
import RoomService from '../../src/services/room.service';
import { buscarAcomodacoes } from '../../src/controllers/findReservation.controller';
import RoomEntity from '../../src/entities/room.entity';

jest.mock('../../src/services/room.service');

const feature = loadFeature(__dirname + '/../features/findReservation.feature');

defineFeature(feature, (test) => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    let mockRooms: RoomEntity[];

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnThis();

        mockResponse = {
            json: jsonMock,
            status: statusMock,
        };
    });

    afterEach(() => {
        jest.clearAllMocks(); // Garante que os mocks sejam limpos entre os testes
    });

    // ✅ Cenário: Encontrar quartos disponíveis
    
        // ✅ Cenário: Encontrar quartos disponíveis
    test('Encontrar quartos disponíveis', ({ given, and, when, then }) => {
        given(/^o RoomService retorna uma lista de acomodações disponíveis para "(.*)"$/, async () => {
            mockRooms = [
                new RoomEntity({
                    id: '101',
                    pj_id: 'PJ123',
                    description: 'Hotel Recife',
                    type: 'deluxe',
                    price: 250,
                    capacity: 2,
                    caracteristics_ids: [],
                    local: 'Recife, PE',
                    stars: 4.5,
                    ar_condicionado: true,
                    tv: true,
                    wifi: true,
                    petFriendly: false,
                    cafeDaManha: true,
                    estacionamento: true,
                    avaliacao: 9.0,
                }),
                new RoomEntity({
                    id: '202',
                    pj_id: 'PJ456',
                    description: 'Pousada Beira-Mar',
                    type: 'standard',
                    price: 150,
                    capacity: 1,
                    caracteristics_ids: [],
                    local: 'Recife, PE',
                    stars: 3.8,
                    ar_condicionado: false,
                    tv: false,
                    wifi: true,
                    petFriendly: false,
                    cafeDaManha: false,
                    estacionamento: false,
                    avaliacao: 7.5,
                })
            ];
            jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockResolvedValue(mockRooms);
        });

        and(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (method, url) => {
            mockRequest = {
                method,
                url,
                query: { destino: 'Recife', data_ida: '2025-03-10', data_volta: '2025-03-15' }
            };
            await buscarAcomodacoes(mockRequest as Request, mockResponse as Response);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(statusMock).toHaveBeenCalledWith(Number(statusCode));
        });

        and('o JSON da resposta deve ser uma lista de acomodações disponíveis', () => {
            expect(jsonMock).toHaveBeenCalledWith(mockRooms);
        });

        and(/^a acomodação com id "(.*)" e nome "(.*)" está na lista$/, (id, name) => {
            expect(jsonMock).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ id, description: name })
                ])
            );
        });
        and(/^a acomodação com id "(.*)" e nome "(.*)" está na lista$/, (id, name) => {
            expect(jsonMock).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ id, description: name })
                ])
            );
        });
    });

    // ✅ Cenário: Buscar acomodações sem destino informado
    test('Buscar acomodações sem destino informado', ({ given, when, then, and }) => {
        given('o destino não foi informado na requisição', () => {});

        when('uma requisição "GET" for enviada para "/buscar-acomodacoes?data_ida=2025-03-10&data_volta=2025-03-15"', async () => {
            mockRequest = { query: { data_ida: '2025-03-10', data_volta: '2025-03-15' } };
            await buscarAcomodacoes(mockRequest as Request, mockResponse as Response);
        });

        then('o status da resposta deve ser "400"', () => {
            expect(statusMock).toHaveBeenCalledWith(400);
        });

        and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (expectedMessage) => {
            expect(jsonMock).toHaveBeenCalledWith({ error: expectedMessage });
        });
    });

    // ✅ Cenário: Buscar acomodações com datas inválidas
    test('Buscar acomodações com datas inválidas', ({ given, when, then, and }) => {
        given(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

        when('uma requisição "GET" for enviada para "/buscar-acomodacoes?destino=Recife&data_ida=2025-03-15&data_volta=2025-03-10"', async () => {
            mockRequest = { query: { destino: 'Recife', data_ida: '2025-03-15', data_volta: '2025-03-10' } };
            await buscarAcomodacoes(mockRequest as Request, mockResponse as Response);
        });

        then('o status da resposta deve ser "400"', () => {
            expect(statusMock).toHaveBeenCalledWith(400);
        });

        and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (expectedMessage) => {
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Data de ida deve ser anterior à data de volta.' });
        });
    });

    test('Buscar acomodações para 4 hóspedes', ({ given, and, when, then }) => {
        given(/^o RoomService retorna uma lista de acomodações adequadas para "(.*)" hóspedes em "(.*)"$/, async () => {
            mockRooms = [
                new RoomEntity({
                    id: '303',
                    pj_id: 'PJ789',
                    description: 'Suíte Familiar',
                    type: 'premium',
                    price: 400,
                    capacity: 4,
                    caracteristics_ids: [],
                    local: 'Recife, PE',
                    stars: 4.8,
                    ar_condicionado: true,
                    tv: true,
                    wifi: true,
                    petFriendly: false,
                    cafeDaManha: true,
                    estacionamento: true,
                    avaliacao: 9.5,
                }),
                new RoomEntity({
                    id: '404',
                    pj_id: 'PJ999',
                    description: 'Cobertura Luxo',
                    type: 'luxo',
                    price: 800,
                    capacity: 6,
                    caracteristics_ids: [],
                    local: 'Recife, PE',
                    stars: 5.0,
                    ar_condicionado: true,
                    tv: true,
                    wifi: true,
                    petFriendly: false,
                    cafeDaManha: true,
                    estacionamento: true,
                    avaliacao: 9.8,
                })
            ];
            jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockResolvedValue(mockRooms);
        });
    
        and(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});
    
        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (method, url) => {
            mockRequest = {
                method,
                url,
                query: { destino: 'Recife', num_pessoas: '4', data_ida: '2025-03-10', data_volta: '2025-03-15' }
            };
            await buscarAcomodacoes(mockRequest as Request, mockResponse as Response);
        });
    
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(statusMock).toHaveBeenCalledWith(Number(statusCode));
        });
    
        and(/^o JSON da resposta deve ser uma lista de acomodações para (\d+) hóspedes$/, (numHospedes) => {
            expect(jsonMock).toHaveBeenCalledWith(mockRooms);
        });
    
        and(/^a acomodação com id "(.*)" e capacidade para "(.*)" pessoas está na lista$/, (id, capacity) => {
            expect(jsonMock).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ id, capacity: Number(capacity) })
                ])
            );
        });
    
        and(/^a acomodação com id "(.*)" e capacidade para "(.*)" pessoas está na lista$/, (id, capacity) => {
            expect(jsonMock).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ id, capacity: Number(capacity) })
                ])
            );
        });
    });

    // ✅ Cenário: Buscar acomodações para 10 hóspedes sem acomodações disponíveis
    test('Buscar acomodações para 10 hóspedes sem acomodações disponíveis', ({ given, and, when, then }) => {
        given(/^o RoomService retorna uma lista vazia para "(.*)" hóspedes em "(.*)"$/, async () => {
            jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockResolvedValue("no_capacity_available");
        });

        and(/^a data de ida é "(.*)" e a data de volta é "(.*)"$/, () => {});

        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (method, url) => {
            mockRequest = {
                method,
                url,
                query: { destino: 'Recife', num_pessoas: '10', data_ida: '2025-03-10', data_volta: '2025-03-15' }
            };
            await buscarAcomodacoes(mockRequest as Request, mockResponse as Response);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(statusMock).toHaveBeenCalledWith(404);
        });

        and(/^a mensagem "(.*)" deve ser retornada$/, (expectedMessage) => {
            expect(jsonMock).toHaveBeenCalledWith({ 
                message: "Não há acomodações disponíveis para o número de pessoas informado. Tente diminuir o número de hóspedes e busque novamente." 
            });
        });
    });

    // ✅ Cenário: Nenhuma acomodação disponível para o destino e datas selecionadas
    test('Nenhuma acomodação disponível para o destino e datas selecionadas', ({ given, when, then, and }) => {
        given(/^o RoomService não encontra acomodações disponíveis para "(.*)" entre "(.*)" e "(.*)"$/, async () => {
            jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockResolvedValue("no_rooms_found");
        });

        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (method, url) => {
            mockRequest = { 
                method, 
                url, 
                query: { destino: 'Recife', data_ida: '2025-03-10', data_volta: '2025-03-15' } 
            };
            await buscarAcomodacoes(mockRequest as Request, mockResponse as Response);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(statusMock).toHaveBeenCalledWith(404);
        });

        and(/^a mensagem "(.*)" deve ser retornada$/, (expectedMessage) => {
            expect(jsonMock).toHaveBeenCalledWith({ 
                message: "Não há acomodações disponíveis no destino e nas datas pesquisadas." 
            });
        });
    });
});

//npx jest --verbose --config ./jest.config.js --detectOpenHandles tests/services/test.findReservationService.steps.ts

