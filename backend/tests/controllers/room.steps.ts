import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RoomRepository from '../../src/repositories/room.repository';
import RoomEntity from '../../src/entities/room.entity';
import { generateToken } from '../utils/generateToken';

const feature = loadFeature('tests/features/room.feature');
const request = supertest(app);

defineFeature(feature, (room) => {
  // mocking the repository
  let mockRoomRepository: RoomRepository;
  let response: supertest.Response;
  let token: string;

  beforeAll(async () => {
    token = generateToken();
  });

  beforeEach(() => {
    mockRoomRepository = di.getRepository<RoomRepository>(RoomRepository);
  });

  room('Create a room successfully', ({ given, when, then, and }) => {
    let roomPjId: string; // Variável para armazenar o `pj_id`
    let response: any;
    given(/^o usuário tem um id de pj "(.*)"$/, (roomId: string) => {
      roomPjId = roomId; // Armazena o `pj_id` passado no `given`
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com:$/,
      (arg0, table) => {
        const requestBody = table.reduce(
          (
            acc: { [x: string]: any },
            row: { campo: string | number; var: string }
          ) => {
            acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
            return acc;
          },
          {}
        );

        return request
          .post(arg0)
          .set('Authorization', `Bearer ${token}`)
          .send(requestBody)
          .then((res) => {
            response = res; // Atualiza a variável response
          })
          .catch((err) => {
            console.error('Erro na requisição:', err);
          });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter a msg "(.*)"$/, (message) => {
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe(message);
    });
  });

  room(
    'Room could not be created due to absence of the field "description"',
    ({ given, when, then, and }) => {
      let roomPjId: string; // Variável para armazenar o `pj_id`
      let response: any;
      given(/^o usuário tem um id de pj "(.*)"$/, (roomId: string) => {
        roomPjId = roomId; // Armazena o `pj_id` passado no `given`
      });

      when(
        /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com:$/,
        (arg0, table) => {
          const requestBody = table.reduce(
            (
              acc: { [x: string]: any },
              row: { campo: string | number; var: string }
            ) => {
              acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
              return acc;
            },
            {}
          );

          return request
            .post(arg0)
            .set('Authorization', `Bearer ${token}`)
            .send(requestBody)
            .then((res) => {
              response = res; // Atualiza a variável response
            })
            .catch((err) => {
              console.error('Erro na requisição:', err);
            });
        }
      );

      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(
        /^o JSON da resposta deve conter a mensagem de erro "(.*)"$/,
        (message) => {
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toBe(message);
        }
      );
    }
  );
  room(
    'Room could not be created due to absence of the field "capacity"',
    ({ given, when, then, and }) => {
      let roomPjId: string; // Variável para armazenar o `pj_id`
      let response: any;
      given(/^o usuário tem um id de pj "(.*)"$/, (roomId: string) => {
        roomPjId = roomId; // Armazena o `pj_id` passado no `given`
      });

      when(
        /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com:$/,
        (arg0, table) => {
          const requestBody = table.reduce(
            (
              acc: { [x: string]: any },
              row: { campo: string | number; var: string }
            ) => {
              acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
              return acc;
            },
            {}
          );

          return request
            .post(arg0)
            .set('Authorization', `Bearer ${token}`)
            .send(requestBody)
            .then((res) => {
              response = res; // Atualiza a variável response
            })
            .catch((err) => {
              console.error('Erro na requisição:', err);
            });
        }
      );

      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(
        /^o JSON da resposta deve conter a mensagem de erro "(.*)"$/,
        (message) => {
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toBe(message);
        }
      );
    }
  );
  room(
    'Room could not be created due to price lower than the minimum allowed',
    ({ given, when, then, and }) => {
      let roomPjId: string; // Variável para armazenar o `pj_id`
      let response: any;
      given(/^o usuário tem um id de pj "(.*)"$/, (roomId: string) => {
        roomPjId = roomId; // Armazena o `pj_id` passado no `given`
      });

      when(
        /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com:$/,
        (arg0, table) => {
          const requestBody = table.reduce(
            (
              acc: { [x: string]: any },
              row: { campo: string | number; var: string }
            ) => {
              acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
              return acc;
            },
            {}
          );

          return request
            .post(arg0)
            .set('Authorization', `Bearer ${token}`)
            .send(requestBody)
            .then((res) => {
              response = res; // Atualiza a variável response
            })
            .catch((err) => {
              console.error('Erro na requisição:', err);
            });
        }
      );

      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(
        /^o JSON da resposta deve conter a mensagem de erro "(.*)"$/,
        (message) => {
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toBe(message);
        }
      );
    }
  );
  room(
    'Room could not be created because price is not a numerical value',
    ({ given, when, then, and }) => {
      let roomPjId: string; // Variável para armazenar o `pj_id`
      let response: any;
      given(/^o usuário tem um id de pj "(.*)"$/, (roomId: string) => {
        roomPjId = roomId; // Armazena o `pj_id` passado no `given`
      });

      when(
        /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com:$/,
        (arg0, table) => {
          const requestBody = table.reduce(
            (
              acc: { [x: string]: any },
              row: { campo: string | number; var: string }
            ) => {
              acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
              return acc;
            },
            {}
          );

          return request
            .post(arg0)
            .set('Authorization', `Bearer ${token}`)
            .send(requestBody)
            .then((res) => {
              response = res; // Atualiza a variável response
            })
            .catch((err) => {
              console.error('Erro na requisição:', err);
            });
        }
      );

      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(
        /^o JSON da resposta deve conter a mensagem de erro "(.*)"$/,
        (message) => {
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toBe(message);
        }
      );
    }
  );
  room(
    'Room could not be created because stars is not a integer between 1 and 5',
    ({ given, when, then, and }) => {
      let roomPjId: string; // Variável para armazenar o `pj_id`
      let response: any;
      given(/^o usuário tem um id de pj "(.*)"$/, (roomId: string) => {
        roomPjId = roomId; // Armazena o `pj_id` passado no `given`
      });

      when(
        /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com:$/,
        (arg0, table) => {
          const requestBody = table.reduce(
            (
              acc: { [x: string]: any },
              row: { campo: string | number; var: string }
            ) => {
              acc[row.campo] = JSON.parse(row.var); // Converte valores corretamente
              return acc;
            },
            {}
          );

          return request
            .post(arg0)
            .set('Authorization', `Bearer ${token}`)
            .send(requestBody)
            .then((res) => {
              response = res; // Atualiza a variável response
            })
            .catch((err) => {
              console.error('Erro na requisição:', err);
            });
        }
      );

      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(
        /^o JSON da resposta deve conter a mensagem de erro "(.*)"$/,
        (message) => {
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toBe(message);
        }
      );
    }
  );
});
