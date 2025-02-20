Feature: Realizar login

  Scenario: Login bem-sucedido
    Given o UserRepository tem um usuario com email "usuario@exemplo.com" e password "senha123"
    When uma requisição POST for enviada para "/api/login" com o corpo da requisição sendo um JSON com email "usuario@exemplo.com" e password "senha123"
    Then o status da resposta deve ser "200"
    And a resposta deve ter um JSON com o token de autenticação

  Scenario: Falha no login por usuário não encontrado
    Given o UserRepository não tem um usuario com email "usario1@exemplo.com" e password "senha1213"
    When uma requisição POST for enviada para "/api/login" com o corpo da requisição sendo um JSON com email "usuario1@exemplo.com" e password "senha123"
    Then o status da resposta deve ser "404"
    And a resposta deve ter um JSON com a mensagem de erro "Usuário não encontrado"

  Scenario: Falha no login por senha incorreta
    Given o UserRepository tem um usuario com email "usuario@exemplo.com" e password "senha123"
    When uma requisição POST for enviada para "/api/login" com o corpo da requisição sendo um JSON  com email "usuario@exemplo.com" e password "senha"
    Then o status da resposta deve ser "401"
    And a resposta deve ter um JSON com a mensagem de erro "Senha inválida"

  Scenario: Falha no login por campos obrigatórios não preenchidos
    Given o UserRepository tem um usuario com email "usuario@exemplo.com" e password "senha123"
    When uma requisição POST for enviada para "/api/login" com o corpo da requisição sendo um JSON com email "" e password "senha123"
    Then o status da resposta deve ser "400"
    And a resposta deve ter um JSON com a mensagem de erro "Email é obrigatório"