Feature: Realizar login
    As a usuário do sistema
    I want to realizar login
    So that eu possa ter acesso as minhas informações no sistema

    Scenario: Login bem-sucedido
        Given eu estou na página de “Login”
        And eu preencho o campo "Email" com "usuario@exemplo.com"
        And eu preencho o campo "Senha" com "senha123"
        When eu seleciono “Entrar”
        Then eu sou redirecionado para a página "Tela inicial”"

    Scenario: Falha no login por credenciais inválidas
        Given eu estou na página de “Login”
        And eu preencho o campo "Email" com "usuario@exemplo.com"
        And eu preencho o campo "Senha" com "senhaIncorreta"
        When eu seleciono “Entrar”
        Then uma mensagem de erro é exibida “Email ou senha inválidos”

    Scenario: Falha no login por campos obrigatórios não preenchidos
        Given eu estou na página de “Login”
        And eu deixo o campo "Email" vazio
        And eu preencho o campo "Senha" com "senha123"
        When eu seleciono “Entrar”
        Then uma mensagem de erro é exibida “O campo Email é obrigatório”

