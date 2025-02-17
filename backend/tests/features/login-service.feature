Feature: Login Service

  # Service
  Scenario: Return token access
    Given o método login chamado com "usu@hormail.com" e "2312412" do AuthService retorna um token de acesso
    When o método login do AuthService for chamado com email "usu@hormail.com" e password "2312412"
    Then o token de acesso retornado deve ser um token de acesso


  Scenario: throw error when user not found
    Given o método login chamado com "usu@hormail.com" e "2312412" do AuthService lança um erro
    When o método login do AuthService for chamado com email "usu@hormail.com" e password "2312412"
    Then o erro retornado deve ser um erro com a mensagem "Usuário não encontrado"

  Scenario: throw error when password is invalid
    Given o método login chamado com "usu@hormail.com" e "2312412" do AuthService lança um erro
    When o método login do AuthService for chamado com email "usu@hormail.com" e password "23"
    Then o erro retornado deve ser um erro com a mensagem "Senha inválida"


