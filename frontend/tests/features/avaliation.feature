Feature: Avaliar Estadia

  Scenario: Enviar avaliação com sucesso
    Given eu estou na página de avaliações
    When eu seleciono 5 estrelas
    And eu insiro o comentário "Ótima estadia!"
    And eu clico no botão "Enviar"
    Then a mensagem de sucesso "Obrigado por compartilhar sua opinião! Sua avaliação foi enviada com sucesso." deve ser exibida

  Scenario: Falha ao enviar avaliação sem selecionar estrelas
    Given eu estou na página de avaliações
    When eu insiro o comentário "Ótima estadia!"
    And eu clico no botão "Enviar"
    Then a mensagem de erro "Por favor, selecione uma classificação por estrelas antes de enviar sua avaliação." deve ser exibida

  Scenario: Falha ao enviar avaliação com erro no servidor
    Given eu estou na página de avaliações
    When eu seleciono 5 estrelas
    And eu insiro o comentário "Ótima estadia!"
    And o servidor retorna um erro
    And eu clico no botão "Enviar"
    Then a mensagem de erro "Internal Server Error" deve ser exibida