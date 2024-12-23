Feature: Acessar pedidos de reservas de uma localidade
	As a  usuário PJ do sistema
	I want to  Ver os pedidos de reservas e as reservas confirmadas de uma localidade
	So that  Eu posso gerenciar as reservas em aberto e confirmadas

    #Scenario GUI 
    Scenario: Abrir gerenciamento de reservas
        Given estou na página "inicial"
        When eu seleciono "Gerenciar reservas"
        Then eu sou direcionado para a página "Gerenciar reservas"

    Scenario: Abrir reservas de uma localidade
	    Given  estou na página "Gerenciar reservas"
	    And  eu vejo que há localidade cadastrada
	    When  eu seleciono a reserva "nome da localidade"
	    Then  eu sou redirecionado para a página de reservas da "nome da localidade" 

    Scenario: Voltar para página de gerenciar reservas
        Given estou na página de reservas da "nome da localidade"
        When eu seleciono "Escolher outra reserva"
        Then eu volto para a página "Gerenciar reservas"

    Scenario: Abrir detalhamento de um pedido de reserva
        Given eu estou na página "nome da localidade"
        And  há pedidos de reservas em "abertos" 
        When  eu seleciono a reserva com "nome do hóspede"
        Then vejo o detalhamento da reserva de "nome do hóspede" 

    Scenario: Confirmar uma reserva
        Given estou na página de detalhamento da reserva "nome do hóspede"
        And a reserva "nome do hóspede" está em aberto
        When eu confirmo a reserva
        Then a reserva é confirmada
        And uma mensagem de aviso é exibida "Reserva confirmada"
        And eu volto para página "nome da localidade"

    Scenario: Recusar uma reserva
        Given estou na página de detalhamento da reserva "nome do hóspede"
        And a reserva "nome do hóspede" está em aberto
        When recuso a reserva
        Then a reserva é recusada
        And uma mensagem de aviso é exibida "Reserva recusada"
        And eu volto para página "nome da localidade"

    Scenario: Cancelar uma reserva 
        Given estou na página de detalhamento da reserva "nome do hóspede"
        And a reserva "nome do hóspede" está confirmada
        When cancelo uma reserva
        Then eu vejo um aviso "Esta reserva foi cancelada"
        And eu volto para página "nome da localidade"

    Scenario: Erro ao cancelar uma reserva
        Given estou na página de detalhamento da reserva "nome do hóspede"
        And a reserva "nome do hóspede" está confirmada
        And já se passou a data "inicio da reserva" 
        When cancelo uma reserva
        Then uma mensagem de erro "Não foi possivel cancelar esta reserva"
        And eu volto para página "nome da localidade"
        And eu vejo que a reserva "nome do hoóspede" ainda consta na listagem

Feature: Acessar as reservas feitas pela minha conta
	As a  usuário PF do sistema
	I want to  Ver os pedidos de reservas e as reservas confirmadas da minha conta
	So that  Eu posso gerenciar as reservas em aberto e confirmadas 

    #Scenario GUI

    Scenario: Abrir detalhamento de um pedido de reserva
        Given eu estou na página "Gerenciar reservas"
        And há pedidos de reservas em "à confirmar" 
        When eu seleciono a reserva com "nome da localidade"
        Then vejo o detalhamento da reserva de "nome da localidade" 

    Scenario: Cancelar uma reserva 
        Given estou na página de detalhamento da reserva "nome da localidade"
        When cancelo uma reserva
        Then eu vejo um aviso "Esta reserva foi cancelada"
        And eu volto para página "Gerenciar reservas"

    Scenario: Erro ao cancelar uma reserva
        Given estou na página de detalhamento da reserva "nome da localidade"
        And a reserva "nome da localidade" já está confirmada
        And já se passou a data de "inicio de reserva"
        When cancelo uma reserva
        Then uma mensagem de erro é exibida "Não foi possivel cancelar uma reserva após o inicio dela"
        And eu volto para a página "Gerenciar reservas"
        And a reserva "nome da localidade" continua na listagem de reserva "confirmadas"

    Scenario: Editar uma reserva 
        Given estou na página de detalhamento da reserva "nome da localidade"
        When seleciono "edita uma reserva"
        Then eu sou direcionado à página "Editar reserva"
        And uma mensagem de aviso "Faça suas alterações" é exibida

    Scenario: Abir página de gerenciar suas reservas
        Given estou na página "Main menu"
        When selecio "Gerenciar minhas reservas"
        Then sou redirecionado à página "Gerenciar minhas reservas"
