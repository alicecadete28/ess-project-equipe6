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

Feature: Realizar cadastro de usuário pessoa física
    As a usuário do sistema
    I want to realizar cadastro
    So that eu possa reservar acomodações

    Scenario: Cadastro de Pessoa Física com sucesso
        Given eu estou na página de “Cadastro”
        And eu preencho o campo "Nome" com "João Silva"
        And eu preencho o campo "CPF" com "123.456.789-00"
        And eu preencho o campo "Data de Nascimento" com "01/01/1990"
        And eu preencho o campo "Telefone" com "(11) 98765-4321"
        And eu preencho o campo "Email" com "pfusuario@exemplo.com"
        And eu preencho o campo "Senha" com "Senha@123"
        And eu confirmo o campo "Senha" com "Senha@123"
        When eu clico em “Concluir”
        Then uma mensagem de sucesso é exibida “Cadastro realizado com sucesso”

    Scenario: Falha ao cadastrar Pessoa Física com CPF inválido
        Given eu estou na página de “Cadastro”
        And eu preencho o campo "Nome" com "João Silva"
        And eu preencho o campo "CPF" com "123456789"
        And eu preencho o campo "Data de Nascimento" com "01/01/1990"
        And eu preencho o campo "Telefone" com "(11) 98765-4321"
        And eu preencho o campo "Email" com "pfusuario@exemplo.com"
        And eu preencho o campo "Senha" com "Senha@123"
        And eu confirmo o campo "Senha" com "Senha@123"
        When eu clico em “Concluir”
        Then uma mensagem de erro é exibida “CPF inválido”

    Scenario: Falha ao cadastrar senha que não atende os critérios
        Given eu estou na página de “Cadastro”
        And eu preencho o campo "Nome" com "João Silva"
        And eu preencho o campo "CPF" com "123.456.789-00"
        And eu preencho o campo "Data de Nascimento" com "01/01/1990"
        And eu preencho o campo "Telefone" com "(11) 98765-4321"
        And eu preencho o campo "Email" com "pfusuario@exemplo.com"
        And eu preencho o campo "Senha" com "12345678"
        And eu confirmo o campo "Senha" com "12345678"
        When eu clico em “Concluir”
        Then uma mensagem de erro é exibida “A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas e caracteres especiais”

    Scenario: Falha ao cadastrar por campos obrigatórios não preenchidos
        Given eu estou na página de “Cadastro”
        And eu deixo o campo "Nome" vazio
        And eu preencho o campo "CPF" com "123.456.789-00"
        And eu preencho o campo "Data de Nascimento" com "01/01/1990"
        And eu preencho o campo "Telefone" com "(11) 98765-4321"
        And eu preencho o campo "Email" com "pfusuario@exemplo.com"
        And eu preencho o campo "Senha" com "Senha@123"
        And eu confirmo o campo "Senha" com "Senha@123"
        When eu clico em “Concluir”
        Then uma mensagem de erro é exibida “O campo Nome é obrigatório”
