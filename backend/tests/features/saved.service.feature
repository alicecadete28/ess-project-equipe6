Feature: Gerenciamento de lista de salvos de um usuário

  Scenario: Recuperar a lista de salvos com sucesso
    Given o PfRepository tem um usuário com id "12732"
    When eu chamar o método getSaved com id "12732"
    Then a resposta deve conter a lista de salvos do usuário

  Scenario: Falha ao recuperar a lista de salvos de um usuário não cadastrado
    Given o PfRepository não tem um usuário com id "99999"
    When eu chamar o método getSaved com id "99999"
    Then uma exceção HttpNotFoundError deve ser lançada com a mensagem "Pf não cadastrado"

  Scenario: Atualizar a lista de salvos com sucesso
    Given o PfRepository tem um usuário com id "12732"
    When eu chamar o método updateSaved com a nova lista ["15", "225", "35"] e id "12732"
    Then a resposta deve conter a nova lista de salvos ["15", "225", "35"]

  Scenario: Falha ao atualizar a lista de salvos de um usuário não cadastrado
    Given o PfRepository não tem um usuário com id "99999"
    When eu chamar o método updateSaved com a nova lista ["15", "225", "35"] e id "99999"
    Then uma exceção HttpNotFoundError deve ser lançada com a mensagem "Pf não cadastrado"
