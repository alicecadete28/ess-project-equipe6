Feature: Reserva de Quartos

  Scenario: Criar uma reserva com sucesso
    Given o TestRepository não tem uma reserva com id "123"
    When uma requisição POST for enviada para "/api/reservations" com o corpo da requisição sendo um JSON com pf_id "user123", room_id "room456", check_in "2025-03-01", check_out "2025-03-05", guests "2", total "500"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter pf_id "user123", room_id "room456", check_in "2025-03-01T00:00:00.000Z", check_out "2025-03-05T00:00:00.000Z", guests "2", total "500", status "pending", rating "0"

  #Scenario: Falha ao criar uma reserva sem token
    #Given uma reserva existe no sistema com id "123"
    #When uma requisição GET for enviada para "/api/reservations/123"
    #Then o status da resposta deve ser "200"
    #And o JSON da resposta deve conter os dados da reserva correspondente

  #Scenario: Atualizar o número de hóspedes em uma reserva
   # Given uma reserva existe no sistema com id "123"
    #When uma requisição POST for enviada para "/api/reservations" sem token
    #Then o status da resposta deve ser "401"
    #And o JSON da resposta deve conter a mensagem "Token not provided"

  

Scenario: Atualizar as datas de uma reserva existente
    Given uma reserva existe no sistema com id "123"
    When uma requisição PATCH for enviada para "/api/reservations/123/dates" com o corpo da requisição sendo um JSON com check_in "2025-04-01" e check_out "2025-04-10"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter check_in "2025-04-01T00:00:00.000Z" e check_out "2025-04-10T00:00:00.000Z"

  Scenario: Confirmar uma reserva existente
    Given uma reserva existe no sistema com id "123" com status "pending"
    When uma requisição PATCH for enviada para "/api/reservations/123/confirm"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter status "confirmed"