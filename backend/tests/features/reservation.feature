Feature: Reserva de Quartos

  Scenario: Criar uma reserva com sucesso
    Given o ReservationRepository não tem uma reserva com id "123"
    When uma requisição POST for enviada para "/api/reservations" com pf_id "user123", room_id "room456", check_in "2025-03-01", check_out "2025-03-05", guests "2", total "500", status "pending", rating stars "0" e rating comment ""
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter pf_id "user123", room_id "room456", check_in "2025-03-01T00:00:00.000Z", check_out "2025-03-05T00:00:00.000Z", guests "2", total "500", status "pending", rating stars "0" e rating comment ""
  #   Scenario: Falha ao criar uma reserva sem token
  #     When uma requisição POST for enviada para "/api/reservations" sem token
  #     Then o status da resposta deve ser "401"
  #     And o JSON da resposta deve conter a mensagem "Token not provided"

  Scenario: Atualizar as datas de uma reserva existente
    Given existe pelo menos uma reserva no sistema com pf_id "123"
    When uma requisição PATCH for enviada para "/api/reservations/"  "/dates" com check_in "2025-04-01" e check_out "2025-04-10"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter check_in "2025-04-01" e check_out "2025-04-10"

  Scenario: Confirmar uma reserva existente
    Given existe pelo menos uma reserva no sistema com pf_id "123" com status "pending"
    When uma requisição PATCH for enviada para "/api/reservations/" "/confirm"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter status "confirmed"

  Scenario: Atualizar o número de hóspedes em uma reserva
    Given existe pelo menos uma reserva no sistema com pf_id "123"
    When uma requisição PATCH for enviada para "/api/reservations/" "/guests" com guests "4"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter guests "4"