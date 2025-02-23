Feature: Serviço de Filtro de Acomodações

  # Serviço
  Scenario: Retornar acomodações filtradas por Wi-Fi
    Given o método filtrarAcomodacoes chamado com uma lista de acomodações e filtro "wifi" retorna acomodações com Wi-Fi
    When o método filtrarAcomodacoes do FilterService for chamado com o filtro "wifi"
    Then a lista de acomodações retornada deve conter apenas acomodações com Wi-Fi

  Scenario: Retornar acomodações filtradas por café da manhã
    Given o método filtrarAcomodacoes chamado com uma lista de acomodações e filtro "cafeDaManha" retorna acomodações com café da manhã
    When o método filtrarAcomodacoes do FilterService for chamado com o filtro "cafeDaManha"
    Then a lista de acomodações retornada deve conter apenas acomodações com café da manhã

  Scenario: Lançar erro quando a lista de acomodações for inválida
    Given o método filtrarAcomodacoes chamado com uma lista inválida lança um erro
    When o método filtrarAcomodacoes do FilterService for chamado com uma lista inválida
    Then o erro retornado deve ser um erro com a mensagem "Lista de acomodações inválida"

  Scenario: Lançar erro quando nenhum filtro for aplicado
    Given o método filtrarAcomodacoes chamado sem filtros lança um erro
    When o método filtrarAcomodacoes do FilterService for chamado sem filtros
    Then o erro retornado deve ser um erro com a mensagem "Nenhum filtro aplicado"