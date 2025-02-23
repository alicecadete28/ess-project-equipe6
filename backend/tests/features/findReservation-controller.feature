Feature: Encontrar quartos disponíveis

  Scenario: Encontrar quartos disponíveis
    Given o RoomRepository tem acomodações para "Recife" entre "2025-03-10" e "2025-03-15"
    When uma requisição GET for enviada para "/api/buscar-acomodacoes?destino=Recife&data_ida=2025-03-10&data_volta=2025-03-15"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de acomodações disponíveis

  Scenario: Buscar acomodações sem destino informado
    Given o destino não foi informado na requisição
    When uma requisição GET for enviada para "/api/buscar-acomodacoes?data_ida=2025-03-10&data_volta=2025-03-15"
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter a mensagem "O destino é obrigatório."

  Scenario: Buscar acomodações com datas inválidas
    Given a data de ida é "2025-03-15" e a data de volta é "2025-03-10"
    When uma requisição GET for enviada para "/api/buscar-acomodacoes?destino=Recife&data_ida=2025-03-15&data_volta=2025-03-10"
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter a mensagem "Data de ida deve ser anterior à data de volta."

  Scenario: Buscar acomodações para 4 hóspedes
    Given o RoomRepository retorna uma lista de acomodações adequadas para "4" hóspedes em "Recife"
    And a data de ida é "2025-03-10" e a data de volta é "2025-03-15"
    When uma requisição GET for enviada para "/api/buscar-acomodacoes?destino=Recife&num_pessoas=4&data_ida=2025-03-10&data_volta=2025-03-15"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de acomodações para 4 hóspedes

  Scenario: Buscar acomodações para 10 hóspedes sem acomodações disponíveis
    Given o RoomRepository não tem acomodação para "10" hóspedes em "Recife"
    And a data de ida é "2025-03-10" e a data de volta é "2025-03-15"
    When uma requisição GET for enviada para "/api/buscar-acomodacoes?destino=Recife&num_pessoas=10&data_ida=2025-03-10&data_volta=2025-03-15"
    Then o status da resposta deve ser "404"
    And o JSON da resposta deve conter a mensagem "Não há acomodações disponíveis para o número de pessoas informado. Tente diminuir o número de hóspedes e busque novamente."

  Scenario: Nenhuma acomodação disponível para o destino e datas selecionadas
    Given o RoomRepository não tem acomodações disponíveis para "Recife" entre "2025-03-10" e "2025-03-15"
    When uma requisição GET for enviada para "/api/buscar-acomodacoes?destino=Recife&data_ida=2025-03-10&data_volta=2025-03-15"
    Then o status da resposta deve ser "404"
    And o JSON da resposta deve conter a mensagem "Não há acomodações disponíveis no destino e nas datas pesquisadas." deve ser retornada
