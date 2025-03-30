Feature: Buscar Acomodações

  Scenario: Buscar com sucesso
    Given eu estou na tela Home
    When eu preencho o campo de destino com "Recife"
    And eu seleciono uma data de entrada válida
    And eu seleciono uma data de saída posterior à data de entrada
    And eu defino o número de hóspedes como 2
    And eu clico no botão "Pesquisar"
    Then a tela de resultados deve ser exibida
    And os dados da busca devem ser armazenados no sessionStorage

  Scenario: Falha ao buscar sem informar destino
    Given eu estou na tela Home
    When eu deixo o campo de destino vazio
    And eu clico no botão "Pesquisar"
    Then a mensagem de alerta "Por favor, informe o destino" deve ser exibida

  Scenario: Falha ao buscar com data de entrada posterior à data de saída
    Given eu estou na tela Home
    When eu seleciono uma data de entrada
    And eu seleciono uma data de saída anterior ou igual à data de entrada
    And eu clico no botão "Pesquisar"
    Then a mensagem de alerta "A data de entrada deve ser anterior à data de saída" deve ser exibida

  Scenario: Falha ao buscar com erro no servidor
    Given eu estou na tela Home
    When eu preencho corretamente o destino, datas e número de hóspedes
    And o servidor retorna um erro
    And eu clico no botão "Pesquisar"
    Then uma mensagem de erro deve ser exibida

  Scenario: Falha ao buscar com destino sem resultados
    Given eu estou na tela Home
    When eu preencho o campo de destino com "Lugar Inexistente"
    And eu clico no botão "Pesquisar"
    Then a mensagem de erro retornada pela API deve ser exibida
