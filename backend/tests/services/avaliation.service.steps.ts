import { loadFeature, defineFeature } from 'jest-cucumber';
import ReservationRepository from '../../src/repositories/reservation.repository';
import ReservationEntity from '../../src/entities/reservation.entity';
import AvaliationService from '../../src/services/avaliation.service';

const feature = loadFeature('tests/features/avaliation.service.feature');

defineFeature(feature, (test) => {
  let mockReservationRepository: jest.Mocked<Partial<ReservationRepository>>;
  let service: AvaliationService;
  let mockReservationEntity: ReservationEntity;
  let response: any;

  beforeEach(() => {
    mockReservationRepository = {
      getReservations: jest.fn(),
      getReservation: jest.fn(),
      createReservation: jest.fn(),
      updateReservation: jest.fn(),
      deleteReservation: jest.fn(),
    };

    service = new AvaliationService(mockReservationRepository as ReservationRepository);

    mockReservationEntity = new ReservationEntity({
      id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a',
      pf_id: '1',
      room_id: '1',
      check_in: new Date('2025-03-09'),
      check_out: new Date('2025-03-10'),
      guests: 0,
      total: 0,
      status: 'o',
      rating: {
        stars: 0,
        comment: 'o'
      }
    });

    // Mock the repository methods
    jest.spyOn(mockReservationRepository, 'getReservations').mockResolvedValue([mockReservationEntity]);
    jest.spyOn(mockReservationRepository, 'updateReservation').mockResolvedValue(mockReservationEntity);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Register an accommodation review successfully', ({ given, when, then }) => {
    given(/^the ReservationRepository has a reservation with id "(.*)"$/, async (reservationId) => {
      const existingReservation = await mockReservationRepository.getReservation!(reservationId);
      if (!existingReservation) {
        await mockReservationRepository.createReservation!(mockReservationEntity);
      }
    });

    when(/^a POST request is sent to "(.*)" with the request body being a JSON with stars "(.*)" and comment "(.*)"$/, async (url, stars, comment) => {
      response = await service.avaliarAcomodacao(mockReservationEntity.id, parseInt(stars, 10), comment);
    });

    then(/^the response should contain the message "(.*)"$/, (message) => {
      expect(response).toEqual(mockReservationEntity);
    });
  });

  test('Return an error when the rating is not between 1 and 5', ({ given, when, then }) => {
    given(/^the ReservationRepository has a reservation with id "(.*)"$/, async (reservationId) => {
      const existingReservation = await mockReservationRepository.getReservation!(reservationId);
      if (!existingReservation) {
        await mockReservationRepository.createReservation!(mockReservationEntity);
      }
    });

    when(/^a POST request is sent to "(.*)" with the request body being a JSON with stars "(.*)" and comment "(.*)"$/, async (url, stars, comment) => {
      try {
        response = await service.avaliarAcomodacao(mockReservationEntity.id, parseInt(stars, 10), comment);
      } catch (error) {
        response = error;
      }
    });

    then(/^the response should contain the error "(.*)"$/, (error) => {
      expect(response.message).toEqual(error);
    });
  });

  test('Limit the comment length to 500 characters', ({ given, when, then }) => {
    given(/^the ReservationRepository has a reservation with id "(.*)"$/, async (reservationId) => {
      const existingReservation = await mockReservationRepository.getReservation!(reservationId);
      if (!existingReservation) {
        await mockReservationRepository.createReservation!(mockReservationEntity);
      }
    });

    when(/^a POST request is sent to "(.*)" with the request body being a JSON with stars "(.*)" and a long comment$/, async (url, stars) => {
      const longComment = 'a'.repeat(600);
      try {
        response = await service.avaliarAcomodacao(mockReservationEntity.id, parseInt(stars, 10), longComment);
      } catch (error) {
        response = error;
      }
    });

    then(/^the response should contain the error "(.*)"$/, (error) => {
      expect(response.message).toEqual(error);
    });
  });
});