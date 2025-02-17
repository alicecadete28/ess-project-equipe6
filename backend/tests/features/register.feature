Feature: Realizar cadastro de usuário pessoa física

  Scenario: Cadastro de Pessoa Física com sucesso
    Given o PfRepository não tem uma pessoa física com o id "12"
    And o UserRepository não tem um usuário com o email "usuario@exemplo.com" e senha "Senha@123" e type "pf"
    When eu faço um POST para "/api/register/pf" com o corpo da requisição sendo um JSON com um objeto user com campo  email "usuario@exemplo.com" e password "Senha@123" e um objeto cliente com campo name "João Silva" e cpf "12345678900" e birth_date "1990-11-10" e phone "11987654321"
    Then a resposta deve ser "201" com a mensagem "Cadastro realizado com sucesso"


  Scenario: Falha ao cadastrar Pessoa Física com CPF inválido
    Given o PfRepository não tem uma pessoa física com o id "12"
    And o UserRepository não tem um usuário com o email "usuario@exemplo.com" e senha "Senha@123" e type "pf"
    When eu faço um POST para "/api/register/pf" com o corpo da requisição sendo um JSON com um objeto user com campo  email "usuario@exemplo.com" e password "Senha@123" e um objeto cliente com campo name "João Silva" e cpf "123adsc45678900" e birth_date "1990-11-10" e phone "11987654321"
    Then a resposta deve ser "400" com a mensagem "CPF inválido"



  Scenario: Cadastro de Pessoa Juridica com sucesso
    Given o PjRepository não tem uma pessoa jurídica com o id "12"
    And o UserRepository não tem um usuário com o email "usuario@exemplo.com" e senha "Senha@123" e type "pj"
    When eu faço um POST para "/api/register/pj" com o corpo da requisição sendo um JSON com um objeto user com campo  email "usuario@exemplo.com" e password "Senha@123" e um objeto cliente com campo name "Empresa LTDA" e cnpj "76779992000169" e cep "50630190" e phone "11987654321" e street "Rua Exemplo" e number "123" e state "SP" e city "São Paulo" e neighborhood "Centro" e complement "Sala 101" e profile_picture "https://www.google.com" e stars '5'
    Then a resposta deve ser "201" com a mensagem "Cadastro realizado com sucesso"

  Scenario: Falha no cadastro de Pessoa Jurídica por CNPJ inválido
    Given o PjRepository não tem uma pessoa jurídica com o id "12"
    And o UserRepository não tem um usuário com o email "usuario@exemplo.com" e senha "Senha@123" e type "pj"
    When eu faço um POST para "/api/register/pj" com o corpo da requisição sendo um JSON com um objeto user com campo  email "usuario@exemplo.com" e password "Senha@123" e um objeto cliente com campo name "Empresa LTDA" e cnpj "7677999dsaa2000169" e cep "50630190" e phone "11987654321" e street "Rua Exemplo" e number "123" e state "SP" e city "São Paulo" e neighborhood "Centro" e complement "Sala 101" e profile_picture "https://www.google.com" e stars '5'
    Then a resposta deve ser "400" com a mensagem "CNPJ inválido"

