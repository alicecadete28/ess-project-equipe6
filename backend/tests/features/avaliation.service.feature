Feature: Avaliation Service

  Scenario: Register an accommodation review successfully
    Given the ReservationRepository has a reservation with id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a"
    When a POST request is sent to "/avaliacoes" with the request body being a JSON with stars "5" and comment "Ótima acomodação!"
    Then the response should contain the message "Avaliação registrada com sucesso!"

  Scenario: Return an error when the rating is not between 1 and 5
    Given the ReservationRepository has a reservation with id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a"
    When a POST request is sent to "/avaliacoes" with the request body being a JSON with stars "6" and comment "Nota inválida"
    Then the response should contain the error "A nota deve ser um número entre 1 e 5."

  Scenario: Limit the comment length to 500 characters
    Given the ReservationRepository has a reservation with id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a"
    When a POST request is sent to "/avaliacoes" with the request body being a JSON with stars "4" and a long comment
    Then the response should contain the error "O comentário não pode ter mais de 500 caracteres."