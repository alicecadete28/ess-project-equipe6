Feature: Publicar acomodacao
  As a usuario PJ do sistema
  I want to publicar uma nova acomodacao
  So that eu possa disponibilizar essa acomodacao para ser reservada por um usuario PF

  Scenario: Publicacao bem sucedida
    Given que estou na página "publicar acomodacao"
    And eu preencho o campo "quantidade de hospedes" com "2"
    And eu seleciono o campo "comodidades" com "Tv"
    And eu preencho o campo "Descricao do quarto" com "Suite aconchegante"
    And eu preencho o campo "local" com "Recife"
    And eu preencho o campo "tipo" com "Casa"
    And eu preencho o campo "caracteristicas" com "espacoso"
    And eu preencho o campo "preco por noite" com "100"
    And eu preencho o campo "estrelas" com "4"
    When eu seleciono "Publicar acomodacao"
    Then uma mensagem é exibida "Acomodação cadastrada com sucesso!"

  Scenario: Falha na publicacao da acomodacao
    Given que estou na página "publicar acomodacao"
    And eu preencho o campo "quantidade de hospedes" com "2"
    And eu seleciono o campo "comodidades" com "Tv"
    And eu preencho o campo "local" com "Recife"
    And eu preencho o campo "tipo" com "Casa"
    And eu preencho o campo "caracteristicas" com "espacoso"
    And eu preencho o campo "preco por noite" com "100"
    And eu preencho o campo "estrelas" com "4"
    When eu seleciono "Publicar acomodacao"
    Then uma mensagem é exibida "A descrição é obrigatória"

  Scenario: Falha na publicacao da acomodacao
    Given que estou na página "publicar acomodacao"
    And eu preencho o campo "quantidade de hospedes" com "2"
    And eu seleciono o campo "comodidades" com "Tv"
    And eu preencho o campo "Descricao do quarto" com "Suite aconchegante"
    And eu preencho o campo "local" com "Recife"
    And eu preencho o campo "tipo" com "Casa"
    And eu preencho o campo "caracteristicas" com "espacoso"
    And eu preencho o campo "preco por noite" com "10"
    And eu preencho o campo "estrelas" com "4"
    When eu seleciono "Publicar acomodacao"
    Then uma mensagem é exibida "O preço deve ser maior que cinquenta"

  Scenario: Falha na publicacao da acomodacao
    Given que estou na página "publicar acomodacao"
    And eu preencho o campo "quantidade de hospedes" com "2"
    And eu seleciono o campo "comodidades" com "Tv"
    And eu preencho o campo "Descricao do quarto" com "Suite aconchegante"
    And eu preencho o campo "local" com "Recife"
    And eu preencho o campo "tipo" com "Casa"
    And eu preencho o campo "caracteristicas" com "espacoso"
    And eu preencho o campo "preco por noite" com "10"
    And eu preencho o campo "estrelas" com "7"
    When eu seleciono "Publicar acomodacao"
    Then uma mensagem é exibida "As estrelas devem ser entre 1 e 5"