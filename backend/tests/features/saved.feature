Feature: SavedRooms API

Scenario: Lista de savedRooms de um usuario bem sucedido
Given o PfRepository tem um usuário com id "12732" e phone "98171-2882"
When uma requisição GET for enviada para "/api/saved/12732" com o corpo da requisição sendo um JSON com id "12732" e phone "98171-2882"
Then o status da resposta deve ser "200"
And a resposta deve ter um JSON com os savedRooms

Scenario: Falha ao acessar a lista de savedRooms de um usuario 
Given o PfRepository tem um usuário com id "12732" e phone "98171-2882"
When uma requisição GET for enviada para "/api/saved/id" com o corpo da requisição sendo um JSON com id "12732" e phone "98171-2882"
Then o status da resposta deve ser "404"
And a resposta deve ter um JSON com a mensagem de erro "Pf não cadastrado"

Scenario: Atualizar a lista de salvos de um usuário com sucesso
Given o PfRepository tem um usuário com id "12732" e phone "98171-2882"
When uma requisição PATCH for enviada para "/api/saved/12732" com o corpo da requisição sendo um JSON contendo id "12732", phone "98171-2882" e uma lista de salvos atualizada
Then o status da resposta deve ser "200"
And a resposta deve ter um JSON confirmando a atualização da lista de salvos

Scenario: Falha ao atualizar a lista de salvos de um usuário
Given o PfRepository não tem um usuário com cpf "99999999" e phone "00000-0000"
When uma requisição PATCH for enviada para "/api/saved/id" com o corpo da requisição sendo um JSON contendo cpf "99999999", phone "00000-0000" e uma lista de salvos
Then o status da resposta deve ser "404"
And a resposta deve ter um JSON com a mensagem de erro "Usuário não encontrado"