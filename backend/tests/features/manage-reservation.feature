Feature: Manage Reservations

#API
Scenario: Return reservations by room_id
    Given o RoomRepository tem um quarto com id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a"
    And o ReservationRepository tem as seguintes reservas: pf_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a", check_in "2025-03-09T00:00:00.000Z", check_out "2025-03-29T00:00:00.000Z", guests "2", total "100", status "Pending", rating "0" e pf_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-03-09T00:00:00.000Z", check_out "2025-03-29T00:00:00.000Z", guests "2", total "100", status "Pending", rating "0"
    When uma requisição GET é feita para "/api/reservations/f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a/room?"
    Then a resposta deve ter status "200"
    And a resposta deve ser um JSON com as seguintes reservas: id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a" pf_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a", check_in "2025-03-09T00:00:00.000Z", check_out "2025-03-29T00:00:00.000Z", guests "2", total "100", status "Pending", rating "0" e id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a" pf_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1d", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a", check_in "2025-03-09T00:00:00.000Z", check_out "2025-03-29T00:00:00.000Z", guests "2", total "100", status "Pending", rating "0"

Scenario: Return reservations by room_id - failed
    Given o RoomRepository não tem um quarto com id "4"
    When uma requisição GET é feita para "/api/reservations/4/room?"
    Then o status de resposta deve ser "400"
    And a resposta deve ser um JSON com a seguinte mensagem: "Room not found"

Scenario: Return reservations by pf_id
    Given o ReservationRepository tem uma reserva com pf_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-02-20T14:00:00", check_out "2025-02-25T11:00:00", guests "2", total "100", status "Pending", rating "0"
    When uma requisição GET é feita para "/api/reservations/f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c/pf"
    Then o status de resposta deve ser "200"
    And a resposta deve ser um JSON com a seguinte reserva: id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a" pf_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-02-20T14:00:00", check_out "2025-02-25T11:00:00", guests "2", total "500", status "confirmed", rating "4.5"

Scenario: Return reservations by pf_id - failed
    Given o ReservationRepository não tem um quarto com id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c"
    When uma requisição GET é feita para "/api/reservations/f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c/pf"
    Then o status de resposta deve ser "400"
    And a resposta deve ser um JSON com a seguinte mensagem: "Reservation not found"