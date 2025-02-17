import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';

const feature = loadFeature('tests/features/reservations.feature');
const request = supertest(app);

let token: string;

beforeAll(async () => {
  const res = await request.post('/login').send({
    email: 'email_de_teste@teste.com',
    password: 'senha123',
  });
  token = res.body.token;
});

defineFeature(feature, (test) => {
  let response: supertest.Response;

  test('Criar uma reserva com sucesso', ({ given, when, then, and }) => {
    given(/^o TestRepository não tem uma reserva com id "(.*)"$/, async (reservationId) => {
      // Limpeza ou verificação se a reserva já existe
    });

    when(/^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)"$/, async (url, pf_id, room_id, check_in, check_out, guests, total) => {
      response = await request.post(url)
        .set('Authorization', `Bearer ${token}`)
        .send({ pf_id, room_id, check_in, check_out, guests: parseInt(guests), total: parseFloat(total), status: 'pending', rating: 0, confirmed: false });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter pf_id "(.*)", room_id "(.*)", check_in "(.*)", check_out "(.*)", guests "(.*)", total "(.*)", status "(.*)", rating "(.*)"$/, (pf_id, room_id, check_in, check_out, guests, total, status, rating) => {
      expect(response.body.data).toEqual(
        expect.objectContaining({
          pf_id,
          room_id,
          check_in: new Date(check_in).toISOString(),
          check_out: new Date(check_out).toISOString(),
          guests: parseInt(guests),
          total: parseFloat(total),
          status,
          rating: parseInt(rating),
          confirmed: false,
        })
      );
    });
  });
});
