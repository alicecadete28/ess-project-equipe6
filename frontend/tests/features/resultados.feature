Feature: Resultados de Busca de Acomodações

  Scenario: Visualizar lista de quartos disponíveis após a busca
    Given a busca por acomodações foi realizada na tela inicial
    And eu sou redirecionado para a página de resultados
    Then a lista de quartos disponíveis deve ser exibida
    And o valor por diária e valor total devem estar visíveis

  Scenario: Aplicar filtro de Wi-Fi com sucesso
    Given estou na tela de resultados
    When eu marco o filtro "Wi-Fi"
    And eu clico no botão "Buscar"
    Then somente os quartos com Wi-Fi devem ser exibidos

  Scenario: Aplicar múltiplos filtros com sucesso
    Given estou na tela de resultados
    When eu marco os filtros "Wi-Fi" e "Café da Manhã"
    And eu clico no botão "Buscar"
    Then somente os quartos com Wi-Fi e Café da Manhã devem ser exibidos

  Scenario: Ordenar por preço
    Given estou na tela de resultados
    When eu marco a opção de ordenação "Preço"
    Then os quartos devem ser exibidos em ordem crescente de preço

  Scenario: Ordenar por estrelas
    Given estou na tela de resultados
    When eu marco a opção de ordenação "Estrelas"
    Then os quartos devem ser exibidos em ordem decrescente de estrelas

  Scenario: Ordenar por avaliação
    Given estou na tela de resultados
    When eu marco a opção de ordenação "Avaliação"
    Then os quartos devem ser exibidos em ordem decrescente de avaliação

  Scenario: Nenhum quarto encontrado após aplicar filtros
    Given estou na tela de resultados
    When eu aplico filtros que não correspondem a nenhum quarto
    And eu clico no botão "Buscar"
    Then a mensagem "Nenhum quarto encontrado com os filtros selecionados." deve ser exibida

  Scenario: Erro do servidor ao buscar quartos
    Given estou na tela de resultados
    When ocorre uma falha ao se comunicar com o servidor
    Then a mensagem "Erro ao se comunicar com o servidor" deve ser exibida

  Scenario: Reservar um quarto
    Given estou na tela de resultados
    When eu clico no botão "Reservar" de um quarto
    Then os dados do quarto e da reserva devem ser armazenados no sessionStorage
    And eu devo ser redirecionado para a tela de compartilhamento (/share)
