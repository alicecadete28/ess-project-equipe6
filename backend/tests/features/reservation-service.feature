Feature: Reservation Service

  # Service
  Scenario: Create a reservation successfully
    Given o método createReservation chamado com dados válidos do ReservationService retorna uma nova reserva
    When o método createReservation do ReservationService for chamado com pf_id "pf123", room_id "room123", check_in "2025-03-10", check_out "2025-03-12", guests "2", total "500"
    Then a reserva retornada deve ter o status "pending" e rating com stars "0" e comment ""

  Scenario: Confirm an existing reservation successfully
    Given o método confirmReservation chamado com id válido do ReservationService retorna uma reserva atualizada
    When o método confirmReservation do ReservationService for chamado com id "reservation123"
    Then a reserva retornada deve ter o status "confirmed"


  Scenario: Update reservation guests successfully
    Given o método updateReservationGuests chamado com id válido e número de hóspedes do ReservationService retorna uma reserva atualizada
    When o método updateReservationGuests do ReservationService for chamado com id "reservation123" e guests "4"
    Then a reserva retornada deve ter guests "4"

  Scenario: Throw error when reservation not found during confirmation
    Given o método confirmReservation chamado com id inválido do ReservationService lança um erro
    When o método confirmReservation do ReservationService for chamado com id "invalid123"
    Then o erro retornado deve ser um erro com a mensagem "Reservation not found"


  Scenario: Throw error when reservation not found during date update
    Given o método updateReservationDates chamado com id inválido do ReservationService lança um erro
    When o método updateReservationDates do ReservationService for chamado com id "invalid123"
    Then o erro retornado deve ser um erro com a mensagem "Reservation not found"
