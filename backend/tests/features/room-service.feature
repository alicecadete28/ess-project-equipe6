Feature: Rooms Service

  # Service
  Scenario: Return all rooms
    Given o método getRooms do RoomsService retorna um array com os seguintes quartos:
      | campo              | var                                    |
      | id                 | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" |
      | pj_id              | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" |
      | description        | "Room Seed"                            |
      | type               | "Seed"                                 |
      | price              | "100"                                  |
      | capacity           | "2"                                    |
      | caracteristics_ids | ["Seed"]                               |
      | local              | "Recife"                               |
      | stars              | "5"                                    |
      | ar_condicionado    | "true"                                 |
      | tv                 | "true"                                 |
      | wifi               | "true"                                 |
      | petFriendly        | "true"                                 |
      | cafeDaManha        | "true"                                 |
      | estacionamento     | "true"                                 |
      | avaliacao          | "5"                                    |
      | id                 | "b7c1d3e5-9f7g-6h5i-3j2k-8l9m7n5o4p3q" |
      | pj_id              | "b7c1d3e5-9f7g-6h5i-3j2k-8l9m7n5o4p3r" |
      | description        | "Luxury Room"                          |
      | type               | "Luxury"                               |
      | price              | "500"                                  |
      | capacity           | "4"                                    |
      | caracteristics_ids | ["Luxury", "Ocean View"]               |
      | local              | "Rio de Janeiro"                       |
      | stars              | "5"                                    |
      | ar_condicionado    | "true"                                 |
      | tv                 | "true"                                 |
      | wifi               | "true"                                 |
      | petFriendly        | "false"                                |
      | cafeDaManha        | "true"                                 |
      | estacionamento     | "true"                                 |
      | avaliacao          | "4.8"                                  |
    When o método getRooms do RoomService for chamado
    Then o array retornado deve conter os seguintes quartos:
      | campo              | var                                    |
      | id                 | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" |
      | pj_id              | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" |
      | description        | "Room Seed"                            |
      | type               | "Seed"                                 |
      | price              | "100"                                  |
      | capacity           | "2"                                    |
      | caracteristics_ids | ["Seed"]                               |
      | local              | "Recife"                               |
      | stars              | "5"                                    |
      | ar_condicionado    | "true"                                 |
      | tv                 | "true"                                 |
      | wifi               | "true"                                 |
      | petFriendly        | "true"                                 |
      | cafeDaManha        | "true"                                 |
      | estacionamento     | "true"                                 |
      | avaliacao          | "5"                                    |
      | id                 | "b7c1d3e5-9f7g-6h5i-3j2k-8l9m7n5o4p3q" |
      | pj_id              | "b7c1d3e5-9f7g-6h5i-3j2k-8l9m7n5o4p3r" |
      | description        | "Luxury Room"                          |
      | type               | "Luxury"                               |
      | price              | "500"                                  |
      | capacity           | "4"                                    |
      | caracteristics_ids | ["Luxury", "Ocean View"]               |
      | local              | "Rio de Janeiro"                       |
      | stars              | "5"                                    |
      | ar_condicionado    | "true"                                 |
      | tv                 | "true"                                 |
      | wifi               | "true"                                 |
      | petFriendly        | "false"                                |
      | cafeDaManha        | "true"                                 |
      | estacionamento     | "true"                                 |
      | avaliacao          | "4.8"                                  |

  Scenario: Return room by id
    Given o método getRoom chamado com "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" do RoomService retorna o seguinte quarto:
      | campo              | var                                    |
      | id                 | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" |
      | pj_id              | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" |
      | description        | "Room Seed"                            |
      | type               | "Seed"                                 |
      | price              | "100"                                  |
      | capacity           | "2"                                    |
      | caracteristics_ids | ["Seed"]                               |
      | local              | "Recife"                               |
      | stars              | "5"                                    |
      | ar_condicionado    | "true"                                 |
      | tv                 | "true"                                 |
      | wifi               | "true"                                 |
      | petFriendly        | "true"                                 |
      | cafeDaManha        | "true"                                 |
      | estacionamento     | "true"                                 |
      | avaliacao          | "5"                                    |
    When o método getRoom do RoomService for chamado com o id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c"
    Then o quarto retornado deve ter os seguintes atributos:
      | campo              | var                                    |
      | id                 | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" |
      | pj_id              | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" |
      | description        | "Room Seed"                            |
      | type               | "Seed"                                 |
      | price              | "100"                                  |
      | capacity           | "2"                                    |
      | caracteristics_ids | ["Seed"]                               |
      | local              | "Recife"                               |
      | stars              | "5"                                    |
      | ar_condicionado    | "true"                                 |
      | tv                 | "true"                                 |
      | wifi               | "true"                                 |
      | petFriendly        | "true"                                 |
      | cafeDaManha        | "true"                                 |
      | estacionamento     | "true"                                 |
      | avaliacao          | "5"                                    |


  Scenario: Return rooms by the pj id

    Given o método getRoomsByPj chamado com "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" do RoomService retorna o seguinte quarto:
      | campo              | var                                    |
      | id                 | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" |
      | pj_id              | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" |
      | description        | "Room Seed"                            |
      | type               | "Seed"                                 |
      | price              | "100"                                  |
      | capacity           | "2"                                    |
      | caracteristics_ids | ["Seed"]                               |
      | local              | "Recife"                               |
      | stars              | "5"                                    |
      | ar_condicionado    | "true"                                 |
      | tv                 | "true"                                 |
      | wifi               | "true"                                 |
      | petFriendly        | "true"                                 |
      | cafeDaManha        | "true"                                 |
      | estacionamento     | "true"                                 |
      | avaliacao          | "5"                                    |
    When o método getRoomsByPj do RoomService for chamado com o id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d"
    Then o quarto retornado deve ter os seguintes atributos:
      | campo              | var                                    |
      | id                 | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" |
      | pj_id              | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" |
      | description        | "Room Seed"                            |
      | type               | "Seed"                                 |
      | price              | "100"                                  |
      | capacity           | "2"                                    |
      | caracteristics_ids | ["Seed"]                               |
      | local              | "Recife"                               |
      | stars              | "5"                                    |
      | ar_condicionado    | "true"                                 |
      | tv                 | "true"                                 |
      | wifi               | "true"                                 |
      | petFriendly        | "true"                                 |
      | cafeDaManha        | "true"                                 |
      | estacionamento     | "true"                                 |
      | avaliacao          | "5"                                    |