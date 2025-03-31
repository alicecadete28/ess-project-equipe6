import { loadFeature, defineFeature } from 'jest-cucumber';
import ReservationService from '../../src/services/reservation.service';
import ReservationRepository from '../../src/repositories/reservation.repository';
import ReservationEntity from '../../src/entities/reservation.entity';
import ReservationServiceMessageCode from '../../src/services/reservation.service';
import { HttpNotFoundError } from '../../src/utils/errors/http.error';

const feature = loadFeature('tests/features/reservation-service.feature');

defineFeature(feature, (test) => {
  let mockReservationRepository: ReservationRepository;
  let service: ReservationService;
  let error: any;
  let reservation: ReservationEntity;

  beforeEach(() => {
    mockReservationRepository = {
      updateReservation: jest.fn(),
      update: jest.fn(),
      add: jest.fn(),
      getReservation: jest.fn(),
    } as any;
    service = new ReservationService(mockReservationRepository);
    error = null;
  });
  test('Create a reservation successfully', ({ given, when, then }) => {
    given(
      'o método createReservation chamado com dados válidos do ReservationService retorna uma nova reserva',
      () => {
        jest.spyOn(mockReservationRepository, 'add').mockResolvedValue({
          id: 'reservation123',
          pf_id: 'pf123',
          room_id: 'room123',
          check_in: new Date('2025-03-10'),
          check_out: new Date('2025-03-12'),
          guests: 2,
          total: 500,
          status: 'pending',
          rating: { stars: 0, comment: '' },
          confirmed: false, 
        });
      }
    );

    when(
      /^o método createReservation do ReservationService for chamado com pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)"$/,
      async (pf_id, room_id, check_in, check_out, guests, total) => {
        reservation = await service.createReservation({
          pf_id,
          room_id,
          check_in: new Date(check_in),
          check_out: new Date(check_out),
          guests: Number(guests),
          total: Number(total),
          confirmed: false,
        });
      }
    );

    then(
      /^a reserva retornada deve ter o status "(.*)" e rating com stars "(.*)" e comment ""$/,
      (status, stars) => {
        expect(reservation.status).toBe(status);
        expect(reservation.rating.stars).toBe(Number(stars));
        expect(reservation.rating.comment).toBe('');
      }
    );
  });

  test('Confirm an existing reservation successfully', ({ given, when, then }) => {
    given(
      'o método confirmReservation chamado com id válido do ReservationService retorna uma reserva atualizada',
      () => {
        jest.spyOn(mockReservationRepository, 'update').mockResolvedValue({
            id: 'reservation123',
            pf_id: 'pf123',
            room_id: 'room123',
            check_in: new Date('2025-03-10'),
            check_out: new Date('2025-03-12'),
            guests: 2,
            total: 500,
            status: 'confirmed',
            rating: { stars: 0, comment: '' },
            confirmed: true,
          });
      }
    );

    when(
      /^o método confirmReservation do ReservationService for chamado com id "(.*)"$/,
      async (id) => {
        reservation = await service.confirmReservation(id);
      }
    );

    then(/^a reserva retornada deve ter o status "(.*)"$/, (status) => {
      expect(reservation.status).toBe(status);
    });
  });
  

  test('Update reservation guests successfully', ({ given, when, then }) => {
    given(
      'o método updateReservationGuests chamado com id válido e número de hóspedes do ReservationService retorna uma reserva atualizada',
      () => {
        jest.spyOn(mockReservationRepository, 'update').mockResolvedValue({
            id: 'reservation123',
            pf_id: 'pf_id123',
            room_id: 'room_id123',
            check_in: new Date('2025-04-01'),
            check_out: new Date('2025-04-05'),
            guests: 4,
            total: 500,
            status: 'pending',
            rating: { stars: 0, comment: '' },
            confirmed: false
        });
      }
    );

    when(
      /^o método updateReservationGuests do ReservationService for chamado com id "(.*)" e guests "(.*)"$/,
      async (id, guests) => {
        reservation = await service.updateReservationGuests(id, Number(guests));
      }
    );

    then(/^a reserva retornada deve ter guests "(.*)"$/, (guests) => {
      expect(reservation.guests).toBe(Number(guests));
    });
  });

  test('Throw error when reservation not found during confirmation', ({ given, when, then }) => {
    given(
      'o método confirmReservation chamado com id inválido do ReservationService lança um erro',
      () => {
        jest
          .spyOn(mockReservationRepository, 'update')
          .mockRejectedValue(
            new HttpNotFoundError({
              msg: 'Reservation not found',
              msgCode: 'reservation_not_found',
            })
          );
      }
    );

    when(
      /^o método confirmReservation do ReservationService for chamado com id "(.*)"$/,
      async (id) => {
        try {
          await service.confirmReservation(id);
        } catch (e) {
          error = e;
        }
      }
    );

    then(
      /^o erro retornado deve ser um erro com a mensagem "(.*)"$/,
      (msg) => {
        expect(error).toBeDefined();
        expect(error.message).toBe(msg);
      }
    );
  });

  test('Throw error when reservation not found during date update', ({ given, when, then }) => {
    given(
      'o método updateReservationDates chamado com id inválido do ReservationService lança um erro',
      () => {
        jest
          .spyOn(mockReservationRepository, 'update')
          .mockRejectedValue(new HttpNotFoundError({
            msg: 'Reservation not found',
            msgCode: 'reservation_not_found',
          }));
      }
    );

    when(
      /^o método updateReservationDates do ReservationService for chamado com id "(.*)"$/,
      async (id) => {
        try {
          await service.updateReservationDates(id, new Date(), new Date());
        } catch (e) {
          error = e;
        }
      }
    );

    then(
      /^o erro retornado deve ser um erro com a mensagem "(.*)"$/,
      (mensagem) => {
        expect(error).toBeDefined();
        expect(error.message).toBe(mensagem);
      }
    );
  });
});
