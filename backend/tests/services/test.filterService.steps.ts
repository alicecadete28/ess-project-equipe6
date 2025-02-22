import { loadFeature, defineFeature } from 'jest-cucumber';
import { Request, Response } from 'express';
import RoomService from '../../src/services/room.service';
import FilterService from '../../src/services/filter.service';
import { filtrarAcomodacoes } from '../../src/controllers/filter.controller';
import RoomEntity from '../../src/entities/room.entity';

const feature = loadFeature(__dirname + '/../features/filter.feature');

defineFeature(feature, test => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    let mockRooms: RoomEntity[] = [
        new RoomEntity({
            id: '101',
            pj_id: 'PJ123',
            description: 'Hotel Recife',
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

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnThis();

        mockResponse = {
            json: jsonMock,
            status: statusMock
        };
    });

    // 🟢 CENÁRIO: Filtrar acomodações Pet Friendly sem disponibilidade
    test('Filtrar acomodações Pet Friendly sem disponibilidade', ({ given, when, then, and }) => {
        given(/^o RoomService não encontra acomodações Pet Friendly para "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/, async () => {
            jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockResolvedValue([]);
        });

        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (method, url) => {
            mockRequest = {
                method,
                url,
                query: {
                    destino: 'Recife',
                    data_ida: '2025-03-10',
                    data_volta: '2025-03-15',
                    num_pessoas: '2',
                    pet_friendly: 'true'
                }
            };

            jest.spyOn(FilterService, 'filtrarAcomodacoes').mockReturnValue([]);

            await filtrarAcomodacoes(mockRequest as Request, mockResponse as Response);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(statusMock).toHaveBeenCalledWith(Number(statusCode));
        });

        and('o JSON da resposta deve ser uma lista vazia', () => {
            expect(jsonMock).toHaveBeenCalledWith({ message: "Nenhuma acomodação atende aos filtros selecionados." });
        });              
        
        and(/^a mensagem "(.*)" deve ser retornada$/, (message) => {
            expect(jsonMock).toHaveBeenCalledWith({ message });
        });
    });

    // 🟢 CENÁRIO: Filtrar acomodações Wifi com disponibilidade
    test('Filtrar acomodações Wifi com disponibilidade', ({ given, and, when, then }) => {
        given(/^o RoomService retorna uma lista de acomodações disponíveis em "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/, async () => {
            jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockResolvedValue(mockRooms);
        });

        and('algumas acomodações possuem Wi-Fi como comodidade', () => {});

        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (method, url) => {
            mockRequest = {
                method,
                url,
                query: {
                    destino: 'Recife',
                    data_ida: '2025-03-10',
                    data_volta: '2025-03-15',
                    num_pessoas: '2',
                    wifi: 'true'
                }
            };

            jest.spyOn(FilterService, 'filtrarAcomodacoes').mockReturnValue(
                mockRooms.filter((room: RoomEntity) => room.wifi)
            );

            await filtrarAcomodacoes(mockRequest as Request, mockResponse as Response);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(statusMock).toHaveBeenCalledWith(Number(statusCode));
        });

        and('o JSON da resposta deve ser uma lista de acomodações que possuem Wi-Fi', () => {
            expect(jsonMock).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ wifi: true })
            ]));
        });

        // 🛠 **Step 7 - Verifica a acomodação com ID 101 e nome "Hotel Recife"**
        and(/^a acomodação com id "(.*)" e nome "(.*)" com Wi-Fi está na lista$/, (id, name) => {
            expect(jsonMock).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ id, description: name, wifi: true })
            ]));
        });

        // 🛠 **Step 8 - Verifica a acomodação com ID 202 e nome "Pousada Beira-Mar"**
        and(/^a acomodação com id "(.*)" e nome "(.*)" com Wi-Fi está na lista$/, (id, name) => {
            expect(jsonMock).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ id, description: name, wifi: true })
            ]));
        });

        // 🛠 **Step 9 - Nenhuma acomodação sem Wi-Fi deve estar na lista**
        and('nenhuma acomodação sem Wi-Fi deve estar na lista', () => {
            const responseData = jsonMock.mock.calls[0][0];
            expect(responseData.every((room: RoomEntity) => room.wifi)).toBe(true);
        });
    });

    // 🟢 CENÁRIO: Filtrar acomodações com café da manhã
    test('Filtrar acomodações com café da manhã', ({ given, and, when, then }) => {
        given(/^o RoomService retorna uma lista de acomodações disponíveis em "(.*)" entre "(.*)" e "(.*)" para "(.*)" hóspedes$/, async () => {
            jest.spyOn(RoomService.prototype, 'buscarAcomodacoes').mockResolvedValue(mockRooms);
        });

        and('algumas acomodações possuem cafe da manha como comodidade', () => {});

        when(/^uma requisição "(.*)" for enviada para "(.*)"$/, async (method, url) => {
            mockRequest = {
                method,
                url,
                query: {
                    destino: 'Recife',
                    data_ida: '2025-03-10',
                    data_volta: '2025-03-15',
                    num_pessoas: '2',
                    cafeDaManha: 'true'
                }
            };

            jest.spyOn(FilterService, 'filtrarAcomodacoes').mockReturnValue(
                mockRooms.filter((room: RoomEntity) => room.cafeDaManha)
            );

            await filtrarAcomodacoes(mockRequest as Request, mockResponse as Response);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(statusMock).toHaveBeenCalledWith(Number(statusCode));
        });

        and('o JSON da resposta deve ser uma lista de acomodações que possuem cafe da manha', () => {
            expect(jsonMock).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ cafeDaManha: true })
            ]));
        });

        // 🛠 **Step 9 - Nenhuma acomodação sem café da manhã deve estar na lista**
        and('nenhuma acomodação sem cafe da manha deve estar na lista', () => {
            const responseData = jsonMock.mock.calls[0][0];
            expect(responseData.every((room: RoomEntity) => room.cafeDaManha)).toBe(true);
        });
    });
});

// npx jest --verbose --config ./jest.config.js --detectOpenHandles tests/services/test.filterService.steps.ts



