import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';
import { Given, When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import assert from 'assert';

let response: request.Response;

Given(
  'o RoomRepository não tem um room com id {string}',
  async function (roomId) {
    // Aqui você pode implementar lógica para remover o quarto, se necessário
    // Mas normalmente, o próprio POST não deveria permitir duplicação de ID
  }
);

When(
  'uma requisição POST for enviada para {string} com o corpo da requisição sendo um JSON com:',
  async function (route, dataTable) {
    const roomData = dataTable.rowsHash(); // Converte tabela do Cucumber para objeto

    // Converte valores booleanos e arrays corretamente
    roomData.ar_condicionado = roomData.ar_condicionado === 'true';
    roomData.tv = roomData.tv === 'true';
    roomData.wifi = roomData.wifi === 'true';
    roomData.petFriendly = roomData.petFriendly === 'true';
    roomData.cafeDaManha = roomData.cafeDaManha === 'true';
    roomData.estacionamento = roomData.estacionamento === 'true';
    roomData.caracteristics_ids = JSON.parse(roomData.caracteristics_ids);
    roomData.price = parseFloat(roomData.price);
    roomData.capacity = parseInt(roomData.capacity);
    roomData.stars = parseInt(roomData.stars);
    roomData.avaliacao = parseFloat(roomData.avaliacao);

    try {
      response = await request(app).post(route).send(roomData);
    } catch (error: any) {
      response = error.response;
    }
  }
);

Then('o status da resposta deve ser {string}', function (expectedStatus) {
  assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve conter:', function (dataTable) {
  const expectedData = dataTable.rowsHash();

  // Converte valores booleanos e arrays corretamente
  expectedData.ar_condicionado = expectedData.ar_condicionado === 'true';
  expectedData.tv = expectedData.tv === 'true';
  expectedData.wifi = expectedData.wifi === 'true';
  expectedData.petFriendly = expectedData.petFriendly === 'true';
  expectedData.cafeDaManha = expectedData.cafeDaManha === 'true';
  expectedData.estacionamento = expectedData.estacionamento === 'true';
  expectedData.caracteristics_ids = JSON.parse(expectedData.caracteristics_ids);
  expectedData.price = parseFloat(expectedData.price);
  expectedData.capacity = parseInt(expectedData.capacity);
  expectedData.stars = parseInt(expectedData.stars);
  expectedData.avaliacao = parseFloat(expectedData.avaliacao);

  // Compara a resposta com os dados esperados
  assert.deepStrictEqual(response.body, expectedData);
});
*/