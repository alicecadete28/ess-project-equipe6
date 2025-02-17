import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';
import RoomRepository from '../../src/repositories/room.repository';
import RoomEntity from '../../src/entities/room.entity';
import ReservationEntity from '../../src/entities/reservation.entity';
import ReservationRepository from '../../src/repositories/reservation.repository';


const feature = loadFeature('tests/features/manage-reservation.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockReservationRepository: ReservationRepository;
    let mockRoomRepository: RoomRepository;
    let response: supertest.Response;
    let mockUserEntity: UserEntity;

    beforeEach(() => {
        mockReservationRepository = di.getRepository<ReservationRepository>(ReservationRepository);
        mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
    });

    test('Return reservations by room_id', ({ given, when, then, and }) => {
        given(
            /^o RoomRepository tem um quarto com id "(.*)"$/,
            async (id) => {
              // Check if the test does not exist in the repository and delete it if it exists
              const user = await mockRoomRepository.getRoom(id);
            
               console.log(user);
            }
        );

        and(
            /^o ReservationRepository tem as seguintes reservas: pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating "(.*)" e pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating "(.*)"$/,
            async (pf_id, room_id,check_in,check_out,guests,total,status,rating,pf_id2, room_id2,check_in2,check_out2,guests2,total2,status2,rating2) => {
                // console.log(pf_id, room_id,check_in,check_out,guests,total,status,rating);
                const reservation = await mockReservationRepository.getReservationByRoomId(room_id);
                // console.log(reservation);
            }
        );

        when(/^uma requisição GET é feita para "(.*)"$/,
            async (url) => {
                response = await request.get(url);
                console.log(response.status);
                console.log(response.text);
            }
        );

        then(/^a resposta deve ter status "(.*)"$/,
            (statusCode) => {
                
                expect(response.status).toBe(parseInt(statusCode, 10));
            }
        );

        and(/^a resposta deve ser um JSON com as seguintes reservas: id "(.*)" pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating "(.*)" e id "(.*)" pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating "(.*)"$/,
            async (id, pf_id, room_id,check_in,check_out,guests,total,status,rating,id2, pf_id2, room_id2,check_in2,check_out2,guests2,total2,status2,rating2) => {
                expect(response.body).toEqual([{
                    check_in: check_in,
                    check_out: check_out,
                    guests: +guests,
                    id: id,
                    pf_id: pf_id,
                    rating: +rating ,
                    room_id: room_id,
                    status: status,
                    total: +total 
                    }, {
                    check_in: check_in2,
                    check_out: check_out2,
                    guests: +guests2,
                    id: id2,
                    pf_id: pf_id2,
                    rating: +rating2,
                    room_id: room_id2,
                    status: status2,
                    total: +total2}]);            
            }
        );
    });

    test('Return reservations by room_id - failed', ({ given, when, then, and }) => {
        given(
            /^o RoomRepository não tem um quarto com id "(.*)"$/,
            async (id) => {
              // Check if the test does not exist in the repository and delete it if it exists
               const user = await mockRoomRepository.getRoom(id);
            
               console.log(user);
            }
        );

        when(/^uma requisição GET é feita para "(.*)"$/, 
            async (url) => {
                response = await request.get(url);
                console.log(response.status);
                console.log(response.text);
            }
        );

        then(/^o status de resposta deve ser "(.*)"$/,
            (statusCode) => {
                expect(response.status).toBe(parseInt(statusCode, 10));
            }
        );

        and(/^a resposta deve ser um JSON com a seguinte mensagem: "(.*)"$/,
            (message) => {
                expect(response.body).toEqual({ error: message });
            }
        )
    })

    // test('Return reservations by pf_id', ({ given, when, then, and }) => {
    //     given(
    //         /^o ReservationRepository tem uma reserva com pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating "(.*)"$/,
    //         async (id) => {
    //           // Check if the test does not exist in the repository and delete it if it exists
    //           const user = await mockRoomRepository.getRoom(id);
            
    //            console.log(user);
    //         }
    //     );
    // });
});