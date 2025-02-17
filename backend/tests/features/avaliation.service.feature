Feature: Serviço de Avaliação

  Scenario: Registrar uma avaliação de acomodação com sucesso
    Given o Repositório de Reservas tem uma reserva com id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a"
    When uma requisição POST é enviada para "/avaliacoes" com o corpo da requisição sendo um JSON com estrelas "5" e comentário "Ótima acomodação!"
    Then a resposta deve conter a mensagem "Avaliação registrada com sucesso!"

  Scenario: Retornar um erro quando a nota não estiver entre 1 e 5
    Given o Repositório de Reservas tem uma reserva com id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a"
    When uma requisição POST é enviada para "/avaliacoes" com o corpo da requisição sendo um JSON com estrelas "6" e comentário "Nota inválida"
    Then a resposta deve conter o erro "A nota deve ser um número entre 1 e 5."

  Scenario: Limitar o comprimento do comentário a 500 caracteres
    Given o Repositório de Reservas tem uma reserva com id "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a"
    When uma requisição POST é enviada para "/avaliacoes" com o corpo da requisição sendo um JSON com estrelas "4" e um comentário longo
    Then a resposta deve conter o erro "O comentário não pode ter mais de 500 caracteres."