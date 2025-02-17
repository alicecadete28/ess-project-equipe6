Feature: Favorites API

Scenario: lista de favoritos de um usuario bem sucedido
Given o PfRepository tem um usuário com cpf "28173891" e phone "98171-2882"
When uma requisição GET for enviada para "/api/favorites/12732" com o corpo da requisição sendo um JSON com cpf "28173891" e phone "98171-2882"
Then o status da resposta deve ser "200"
And a resposta deve ter um JSON com os favoritos

Scenario: Falha ao acessar a lista de favoritos de um usuario 
Given o PfRepository tem um usuário com cpf "28173891" e phone "98171-2882"
When uma requisição GET for enviada para "/api/saved/12" com o corpo da requisição sendo um JSON com cpf "28173891" e phone "98171-2882"
Then o status da resposta deve ser "404"
And a resposta deve ter um JSON com a mensagem de erro "Pf não cadastrado"