import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import ReservationRepository from '../../src/repositories/reservation.repository';
import ReservationEntity from '../../src/entities/reservation.entity';

const feature = loadFeature('tests/features/avaliation.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockReservationRepository: ReservationRepository;
  let mockReservationEntity: ReservationEntity;
  let response: supertest.Response;

  beforeEach(() => {
    // Get the repository instance from the DI container
    mockReservationRepository = di.getRepository<ReservationRepository>(ReservationRepository);

    // Ensure that the repository instance is not undefined
    if (!mockReservationRepository) {
      throw new Error('Failed to get ReservationRepository from DI container');
    }

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
    jest.spyOn(mockReservationRepository, 'updateReservation').mockImplementation(async (id, data) => {
      return { ...data, id };
    });
  });

  test('Register an accommodation review successfully', ({ given, when, then }) => {
    given(/^the ReservationRepository has a reservation with id "(.*)"$/, async (reservationId) => {
      const existingReservation = await mockReservationRepository.getReservation(reservationId);
      if (!existingReservation) {
        await mockReservationRepository.createReservation(mockReservationEntity);
      }
    });

    when(/^a POST request is sent to "(.*)" with the request body being a JSON with stars "(.*)" and comment "(.*)"$/, async (url, stars, comment) => {
      response = await request.post(url).send({
        num_estrelas: parseInt(stars, 10),
        comentario: comment
      });
    });

    then(/^the response status should be "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    then(/^the JSON response should contain the message "(.*)"$/, (message) => {
      expect(response.body.message).toEqual(message);
    });
  });

  test('Return an error when the rating is not between 1 and 5', ({ given, when, then }) => {
    given(/^the ReservationRepository has a reservation with id "(.*)"$/, async (reservationId) => {
      const existingReservation = await mockReservationRepository.getReservation(reservationId);
      if (!existingReservation) {
        await mockReservationRepository.createReservation(mockReservationEntity);
      }
    });

    when(/^a POST request is sent to "(.*)" with the request body being a JSON with stars "(.*)" and comment "(.*)"$/, async (url, stars, comment) => {
      response = await request.post(url).send({
        num_estrelas: parseInt(stars, 10),
        comentario: comment
      });
    });

    then(/^the response status should be "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    then(/^the JSON response should contain the error "(.*)"$/, (error) => {
      expect(response.body.error).toEqual(error);
    });
  });

  test('Limit the comment length to 500 characters', ({ given, when, then }) => {
    given(/^the ReservationRepository has a reservation with id "(.*)"$/, async (reservationId) => {
      const existingReservation = await mockReservationRepository.getReservation(reservationId);
      if (!existingReservation) {
        await mockReservationRepository.createReservation(mockReservationEntity);
      }
    });

    when(/^a POST request is sent to "(.*)" with the request body being a JSON with stars "(.*)" and a long comment$/, async (url, stars) => {
      const longComment = 'a'.repeat(600);
      response = await request.post(url).send({
        num_estrelas: parseInt(stars, 10),
        comentario: longComment
      });
    });

    then(/^the response status should be "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    then(/^the JSON response should contain the error "(.*)"$/, (error) => {
      expect(response.body.error).toEqual(error);
    });
  });
});