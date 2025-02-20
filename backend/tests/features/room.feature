Feature: Tests

  # API
  Scenario: Create a room
    Given o usuário tem um id de pj "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d"
    When uma requisição POST for enviada para "/api/rooms" com o corpo da requisição sendo um JSON com:
      | campo              | var         |
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

  Scenario: Room could not be created due to absence of the field "description"
    Given o usuário tem um id de pj "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d"
    When uma requisição POST for enviada para "/api/rooms" com o corpo da requisição sendo um JSON com:
      | campo              | var      |
      | type               | "Seed"   |
      | price              | "100"    |
      | capacity           | "2"      |
      | caracteristics_ids | ["Seed"] |
      | local              | "Recife" |
      | stars              | "5"      |
      | ar_condicionado    | "true"   |
      | tv                 | "true"   |
      | wifi               | "true"   |
      | petFriendly        | "true"   |
      | cafeDaManha        | "true"   |
      | estacionamento     | "true"   |
      | avaliacao          | "5"      |
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter a mensagem de erro "A descrição do quarto é obrigatória"

  Scenario: Room could not be created due to absence of the field "capacity"
    Given o usuário tem um id de pj "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d"
    When uma requisição POST for enviada para "/api/rooms" com o corpo da requisição sendo um JSON com:
      | campo              | var         |
      | description        | "Room Seed" |
      | type               | "Seed"      |
      | price              | "100"       |
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
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter a mensagem de erro "A capacidade do quarto é obrigatória"

  Scenario: Room could not be created due to price lower than the minimum allowed
    Given o usuário tem um id de pj "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d"
    When uma requisição POST for enviada para "/api/rooms" com o corpo da requisição sendo um JSON com:
      | campo              | var         |
      | description        | "Room Seed" |
      | type               | "Seed"      |
      | price              | "10"        |
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
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter a mensagem de erro "O preço mínimo da diária é de 50 reais"