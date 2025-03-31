Feature: Gerenciamento de favoritos de um usuário

  Scenario: Recuperar a lista de favoritos com sucesso
    Given o PfRepository tem um usuário com id "12732"
    When eu chamar o método getFavorites com id "12732"
    Then a resposta deve conter a lista de favoritos do usuário

  Scenario: Falha ao recuperar a lista de favoritos de um usuário não cadastrado
    Given o PfRepository não tem um usuário com id "99999"
    When eu chamar o método getFavorites com id "99999"
    Then uma exceção HttpNotFoundError deve ser lançada com a mensagem "Pf não cadastrado"

  Scenario: Atualizar a lista de favoritos com sucesso
    Given o PfRepository tem um usuário com id "12732"
    When eu chamar o método updateFavorite com a nova lista ["15", "25", "35"] e id "12732"
    Then a resposta deve conter a nova lista de favoritos ["15", "25", "35"]

  Scenario: Falha ao atualizar a lista de favoritos de um usuário não cadastrado
    Given o PfRepository não tem um usuário com id "99999"
    When eu chamar o método updateFavorite com a nova lista ["15", "25", "35"] e id "99999"
    Then uma exceção HttpNotFoundError deve ser lançada com a mensagem "Pf não cadastrado"
