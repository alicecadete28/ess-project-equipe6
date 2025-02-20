Feature: Rooms Service

  # Service
  Scenario: Return all rooms
    Given o método getRooms do RoomsService retorna um array com o seguinte quarto:
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
    When o método getRooms do RoomService for chamado
    Then o array retornado deve conter o seguinte quarto:
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

  Scenario: Return room by id
    Given o método getRoom chamado com "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" do RoomService retorna o seguinte quarto:
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


# Scenario: Return test by the pj id

#   Given o método getRoom chamado com "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" do RoomService retorna o seguinte quarto:
#     | id                 | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" |
#     | pj_id              | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" |
#     | description        | "Room Seed"                            |
#     | type               | "Seed"                                 |
#     | price              | "100"                                  |
#     | capacity           | "2"                                    |
#     | caracteristics_ids | ["Seed"]                               |
#     | local              | "Recife"                               |
#     | stars              | "5"                                    |
#     | ar_condicionado    | "true"                                 |
#     | tv                 | "true"                                 |
#     | wifi               | "true"                                 |
#     | petFriendly        | "true"                                 |
#     | cafeDaManha        | "true"                                 |
#     | estacionamento     | "true"                                 |
#     | avaliacao          | "5"                                    |
#   When o método getRoom do RoomService for chamado com o id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d"
#   Then o quarto retornado deve ter os seguintes atributos:
#     | id                 | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" |
#     | pj_id              | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" |
#     | description        | "Room Seed"                            |
#     | type               | "Seed"                                 |
#     | price              | "100"                                  |
#     | capacity           | "2"                                    |
#     | caracteristics_ids | ["Seed"]                               |
#     | local              | "Recife"                               |
#     | stars              | "5"                                    |
#     | ar_condicionado    | "true"                                 |
#     | tv                 | "true"                                 |
#     | wifi               | "true"                                 |
#     | petFriendly        | "true"                                 |
#     | cafeDaManha        | "true"                                 |
#     | estacionamento     | "true"                                 |
#     | avaliacao          | "5"                                    |