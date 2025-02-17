import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import ReservationRepository from '../../src/repositories/reservation.repository';
import ReservationEntity from '../../src/entities/reservation.entity';

const feature = loadFeature('tests/features/reservation.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockReservationRepository: ReservationRepository;
  let response: supertest.Response;
  let token: string;

  beforeAll(async () => {
    const res = await request.post('/login').send({
      email: 'email_de_teste@teste.com',
      password: 'senha123',
    });
    token = res.body.token;
  });

  beforeEach(() => {
    mockReservationRepository = di.getRepository<ReservationRepository>(ReservationRepository);
  });

  test('Criar uma reserva com sucesso', ({ given, when, then, and }) => {
    given(/^o TestRepository não tem uma reserva com id "(.*)"$/, async (id) => {
      const existing = await mockReservationRepository.findOne((r) => r.id === id);
      if (existing) await mockReservationRepository.delete((r) => r.id === id);
    });

    when(/^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)"$/, 
      async (url, pf_id, room_id, check_in, check_out, guests, total) => {
        response = await request.post(url)
          .set('Authorization', `Bearer ${token}`)
          .send({ pf_id, room_id, check_in, check_out, guests: Number(guests), total: Number(total), status: 'pending', rating: 0, confirmed: false });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (status) => {
      expect(response.status).toBe(Number(status));
    });

    and(/^o JSON da resposta deve conter pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating "(.*)"$/, (pf_id, room_id, check_in, check_out, guests, total, status, rating) => {
      expect(response.body.data).toMatchObject({
        pf_id, room_id, check_in, check_out, guests: Number(guests), total: Number(total), status, rating: Number(rating)
      });
    });
  });

  test('Buscar uma reserva existente', ({ given, when, then, and }) => {
    given(/^uma reserva existe no sistema com id "(.*)"$/, async (id) => {
      await mockReservationRepository.add(new ReservationEntity({ id, pf_id: 'user123', room_id: 'room456', check_in: new Date(), check_out: new Date(), guests: 2, total: 500, status: 'pending', rating: 0, confirmed: false }));
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
      response = await request.get(url).set('Authorization', `Bearer ${token}`);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (status) => {
      expect(response.status).toBe(Number(status));
    });

    and('o JSON da resposta deve conter os dados da reserva correspondente', () => {
      expect(response.body.data).toBeDefined();
    });
  });

  test('Atualizar o número de hóspedes em uma reserva', ({ given, when, then, and }) => {
    given(/^uma reserva existe no sistema com id "(.*)"$/, async (id) => {
      await mockReservationRepository.add(new ReservationEntity({ id, pf_id: 'user123', room_id: 'room456', check_in: new Date(), check_out: new Date(), guests: 2, total: 500, status: 'pending', rating: 0, confirmed: false }));
    });

    when(/^uma requisição PATCH for enviada para "(.*)" com o corpo da requisição sendo um JSON com guests "(.*)"$/, async (url, guests) => {
      response = await request.patch(url).set('Authorization', `Bearer ${token}`).send({ guests: Number(guests) });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (status) => {
      expect(response.status).toBe(Number(status));
    });

    and(/^o JSON da resposta deve conter guests "(.*)"$/, (guests) => {
      expect(response.body.data.guests).toBe(Number(guests));
    });
  });

  test('Excluir uma reserva', ({ given, when, then, and }) => {
    given(/^uma reserva existe no sistema com id "(.*)"$/, async (id) => {
      await mockReservationRepository.add(new ReservationEntity({ id, pf_id: 'user123', room_id: 'room456', check_in: new Date(), check_out: new Date(), guests: 2, total: 500, status: 'pending', rating: 0, confirmed: false }));
    });

    when(/^uma requisição DELETE for enviada para "(.*)"$/, async (url) => {
      response = await request.delete(url).set('Authorization', `Bearer ${token}`);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (status) => {
      expect(response.status).toBe(Number(status));
    });

    and('a reserva não deve mais existir no sistema', async () => {
      const exists = await mockReservationRepository.findOne((r) => r.id === response.body.data.id);
      expect(exists).toBeNull();
    });
  });

  test('Atualizar as datas de uma reserva existente', ({ given, when, then, and }) => {
    given(/^uma reserva existe no sistema com id "(.*)"$/, async (id) => {
      await mockReservationRepository.add(new ReservationEntity({ id, pf_id: 'user123', room_id: 'room456', check_in: new Date(), check_out: new Date(), guests: 2, total: 500, status: 'pending', rating: 0, confirmed: false }));
    });

    when(/^uma requisição PATCH for enviada para "(.*)" com o corpo da requisição sendo um JSON com check_in "(.*)" e check_out "(.*)"$/, async (url, check_in, check_out) => {
      response = await request.patch(url).set('Authorization', `Bearer ${token}`).send({ check_in, check_out });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (status) => {
      expect(response.status).toBe(Number(status));
    });

    and(/^o JSON da resposta deve conter check_in "(.*)" e check_out "(.*)"$/, (check_in, check_out) => {
      expect(response.body.data.check_in).toContain(check_in);
      expect(response.body.data.check_out).toContain(check_out);
    });
  });

  test('Confirmar uma reserva existente', ({ given, when, then, and }) => {
    given(/^uma reserva existe no sistema com id "(.*)" com status "(.*)"$/, async (id, status) => {
      await mockReservationRepository.add(new ReservationEntity({ id, pf_id: 'user123', room_id: 'room456', check_in: new Date(), check_out: new Date(), guests: 2, total: 500, status, rating: 0, confirmed: false }));
    });

    when(/^uma requisição PATCH for enviada para "(.*)"$/, async (url) => {
      response = await request.patch(url).set('Authorization', `Bearer ${token}`);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (status) => {
      expect(response.status).toBe(Number(status));
    });

    and(/^o JSON da resposta deve conter status "(.*)"$/, (status) => {
      expect(response.body.data.status).toBe(status);
    });
  });
});
