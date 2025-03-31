import { loadFeature, defineFeature } from 'jest-cucumber';
import ReservationService from '../../src/services/reservation.service';
import ReservationRepository from '../../src/repositories/reservation.repository';
import ReservationEntity from '../../src/entities/reservation.entity';
import ReservationServiceMessageCode from '../../src/services/reservation.service';
import { get } from 'http';
import { create } from 'domain';

const feature = loadFeature('tests/features/manage-reservation-service.feature');

defineFeature(feature, (test) => {
    let mockReservationRepository: ReservationRepository;
    let service: ReservationService;
    let error: any;
    let reservationList: ReservationEntity[];

    let mockReservation: ReservationEntity;

    beforeEach(() => {
        mockReservationRepository = {
          updateReservation: jest.fn(),
          update: jest.fn(),
          add: jest.fn(),
          createReservation: jest.fn(),
          getReservation: jest.fn(),
          getReservationByRoomId: jest.fn(),
          getReservationsByPFId: jest.fn(),
        } as any;
        service = new ReservationService(mockReservationRepository);
        error = null;
      });

      test('Return reservations by room id', ({ given, when, then }) => {
            given(/^o método getReservationByRoomId da ReservatioService chamado para o quarto de rooom_id "(.*)" retorna um array com as reservas ligadas a esse quarto$/, 
                async (id) => {

                    mockReservation = new ReservationEntity({
                        id: '',
                        pf_id: 'pf123',
                        room_id: id,
                        check_in: new Date('2025-03-10T00:00:00'),
                        check_out: new Date('2025-03-12T00:00:00'),
                        guests: 2,
                        total: 500,
                        status: 'pending',
                        rating: { stars: 0, comment: '' },
                        confirmed: false,
                    });

                    jest
                        .spyOn(mockReservationRepository, 'getReservationByRoomId')
                        .mockResolvedValue([mockReservation]);
                });
            
            when(/^o método getReservationByRoomId do ReservatioService for chamado com o id "(.*)"$/,
                async (id) => {
                    reservationList = await service.getReservationByRoomId(id);
                }
            )

            then(/^o array de retorno deve conter as seguintes reservas: id "(.*)" pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating_stars "(.*)", rating_comment "(.*)" confirmed "(.*)"$/,
                async(id, pf_id, room_id, check_in, check_out, guests, total, status, rating_stars, rating_comment, confirmed) => {
                    expect(reservationList).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            id: id,
                            pf_id: pf_id,
                            room_id: room_id,
                            check_in: new Date(check_in),
                            check_out: new Date(check_out),
                            guests: parseInt(guests),
                            total: parseFloat(total),
                            status: status,
                            rating: { stars: parseInt(rating_stars), comment: rating_comment },
                            confirmed: confirmed === 'true'
                        })
                    ]));
                }
            );
      });

//       test('Return reservations by pf_id', ({ given, when, then }) => {
//         given(/^o método getReservationByPFId da ReservationService chamado para o usuário de pf_id "(.*)" retorna um array com as reservas ligadas a esse usuário$/, 
//             async (id) => {

//                 mockReservation = new ReservationEntity({
//                     id: '',
//                     pf_id: id,
//                     room_id: 'room123',
//                     check_in: new Date('2025-03-10T00:00:00'),
//                     check_out: new Date('2025-03-12T00:00:00'),
//                     guests: 2,
//                     total: 500,
//                     status: 'pending',
//                     rating: { stars: 0, comment: '' },
//                     confirmed: false,
//                 });

//                 jest
//                     .spyOn(mockReservationRepository, 'getReservationByPFId')
//                     .mockResolvedValue([mockReservation]);
//             });
        
//         when(/^o método getReservationByPFId do ReservationService for chamado com o id "(.*)"$/,
//             async (id) => {
//                 reservationList = await service.getReservationByPFId(id);
//             }
//         )

//         then(/^o array de retorno deve conter as seguintes reservas: id "(.*)" pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating_stars "(.*)", rating_comment "(.*)" confirmed "(.*)"$/,
//             async(id, pf_id, room_id, check_in, check_out, guests, total, status, rating_stars, rating_comment, confirmed) => {
//                 expect(reservationList).toEqual(expect.arrayContaining([
//                     expect.objectContaining({
//                         id: id,
//                         pf_id: pf_id,
//                         room_id: room_id,
//                         check_in: new Date(check_in),
//                         check_out: new Date(check_out),
//                         guests: parseInt(guests),
//                         total: parseFloat(total),
//                         status: status,
//                         rating: { stars: parseInt(rating_stars), comment: rating_comment },
//                         confirmed: confirmed === 'true'
//                     })
//                 ]));
//             }
//         );
//   });

});
