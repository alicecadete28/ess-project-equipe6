#Created by Arthur Marsaro
#Date: 15/02/2025
#Last update: 15/02/2025

Feature: Manage Reservation

    #service
Cenario: Return reservations by room id
    Given o método getReservationByRoomId da ReservatioService chamado para o quarto de rooom_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c" retorna um array a qual possui as seguintes reservas:
    pf_id "1", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-02-20T14:00:00", check_out "2025-02-25T11:00:00", guests "2", total "500", status "confirmed", rating "4.5"
    e pf_id "2", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-03-01T14:00:00", check_out "2025-03-05T11:00:00", guests "3", total "750", status "pending", rating "4.0"
    When o método getReservationByRoomId do ReservatioService for chamado com o id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c"
    Then o array de retorno deve conter as seguintes reservas: pf_id "1", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-02-20T14:00:00", check_out "2025-02-25T11:00:00", guests "2", total "500", status "confirmed", rating "4.5"
    e pf_id "2", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-03-01T14:00:00", check_out "2025-03-05T11:00:00", guests "3", total "750", status "pending", rating "4.0"

Cenario: Return reservations by pf_id
    Given o método getReservationByPFId da ReservationService chamado para o usuário de pf_id "1" retorna um array a qual possui as seguintes reservas: 
    pf_id "1", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-02-20T14:00:00", check_out "2025-02-25T11:00:00", guests "2", total "500", status "confirmed", rating "4.5"
    e pf_id "1", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-03-01T14:00:00", check_out "2025-03-05T11:00:00", guests "3", total "750", status "pending", rating "4.0"
    When o método getReservationByPFId do ReservationService for chamado com o id "1"
    Then o array de retorno deve conter as seguintes reservas: pf_id "1", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-02-20T14:00:00", check_out "2025-02-25T11:00:00", guests "2", total "500", status "confirmed", rating "4.5" e pf_id "1", room_id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c", check_in "2025-03-01T14:00:00", check_out "2025-03-05T11:00:00", guests "3", total "750", status "pending", rating "4.0"