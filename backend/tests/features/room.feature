Feature: Tests

  # API
  Scenario: Create a room
    Given o usuário tem um id de pj "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d"
    When uma requisição POST for enviada para "/api/rooms" com o corpo da requisição sendo um JSON com:
      | description        | "Room Seed" |
      | type               | "Seed"      |
      | price              | "100"       |
      | capacity           | "2"         |
      | caracteristics_ids | ["Seed"]    |
      | local              | "Recife"    |
      | stars              | "5"         |
      | ar_condicionado    | "true"      |
      | tv                 | "true"      |
      | wifi               | "true"      |
      | petFriendly        | "true"      |
      | cafeDaManha        | "true"      |
      | estacionamento     | "true"      |
      | avaliacao          | "5"         |
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter a msg "POST /api/rooms"

# Scenario: Room could not be created due to incompleted fields
#   Given o usuário tem um id de pj "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d"
#   When uma requisição POST for enviada para "/api/rooms" com o corpo da requisição sendo um JSON com:
#     | pj_id              | "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d" |
#     | description        | ""                                     |
#     | type               | "CASA"                                 |
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
#   Then o status da resposta deve ser "400"
#   And o JSON da resposta deve conter a mensagem de erro "A descrição do quarto é obrigatória"