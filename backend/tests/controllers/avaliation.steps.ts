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
    // Obter a instância do repositório do contêiner DI
    mockReservationRepository = di.getRepository<ReservationRepository>(ReservationRepository);

    // Garantir que a instância do repositório não seja indefinida
    if (!mockReservationRepository) {
      throw new Error('Falha ao obter ReservationRepository do contêiner DI');
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

    // Mock dos métodos do repositório
    jest.spyOn(mockReservationRepository, 'getReservations').mockResolvedValue([mockReservationEntity]);
    jest.spyOn(mockReservationRepository, 'updateReservation').mockImplementation(async (id, data) => {
      return { ...data, id };
    });
  });

  test('Registrar uma avaliação de acomodação com sucesso', ({ given, when, then, and }) => {
    given(/^o Repositório de Reservas tem uma reserva com id "(.*)"$/, async (reservationId) => {
      const existingReservation = await mockReservationRepository.getReservation(reservationId);
      if (!existingReservation) {
        await mockReservationRepository.createReservation(mockReservationEntity);
      }
    });

    when(/^uma requisição POST é enviada para "(.*)" com o corpo da requisição sendo um JSON com estrelas "(.*)" e comentário "(.*)"$/, async (url, stars, comment) => {
      response = await request.post(url).send({
        num_estrelas: parseInt(stars, 10),
        comentario: comment
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta em JSON deve conter a mensagem "(.*)"$/, (message) => {
      expect(response.body.message).toEqual(message);
    });
  });

  test('Retornar um erro quando a nota não estiver entre 1 e 5', ({ given, when, then, and }) => {
    given(/^o Repositório de Reservas tem uma reserva com id "(.*)"$/, async (reservationId) => {
      const existingReservation = await mockReservationRepository.getReservation(reservationId);
      if (!existingReservation) {
        await mockReservationRepository.createReservation(mockReservationEntity);
      }
    });

    when(/^uma requisição POST é enviada para "(.*)" com o corpo da requisição sendo um JSON com estrelas "(.*)" e comentário "(.*)"$/, async (url, stars, comment) => {
      response = await request.post(url).send({
        num_estrelas: parseInt(stars, 10),
        comentario: comment
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta em JSON deve conter o erro "(.*)"$/, (error) => {
      expect(response.body.error).toEqual(error);
    });
  });

  test('Limitar o comprimento do comentário a 500 caracteres', ({ given, when, then, and }) => {
    given(/^o Repositório de Reservas tem uma reserva com id "(.*)"$/, async (reservationId) => {
      const existingReservation = await mockReservationRepository.getReservation(reservationId);
      if (!existingReservation) {
        await mockReservationRepository.createReservation(mockReservationEntity);
      }
    });

    when(/^uma requisição POST é enviada para "(.*)" com o corpo da requisição sendo um JSON com estrelas "(.*)" e um comentário longo$/, async (url, stars) => {
      const longComment = 'a'.repeat(600);
      response = await request.post(url).send({
        num_estrelas: parseInt(stars, 10),
        comentario: longComment
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta em JSON deve conter o erro "(.*)"$/, (error) => {
      expect(response.body.error).toEqual(error);
    });
  });
});