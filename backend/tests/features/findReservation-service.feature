Feature: Encontrar quartos disponíveis

Scenario: Encontrar quartos disponíveis
Given o RoomService retorna uma lista de acomodações disponíveis para "Recife" 
And a data de ida é "2025-03-10" e a data de volta é "2025-03-15"
When uma requisição "GET" for enviada para "/buscar-acomodacoes?destino=Recife&data_ida=2025-03-10&data_volta=2025-03-15"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser uma lista de acomodações disponíveis
And a acomodação com id "101" e nome "Hotel Recife" está na lista
And a acomodação com id "202" e nome "Pousada Beira-Mar" está na lista

Scenario: Buscar acomodações sem destino informado
Given o destino não foi informado na requisição
When uma requisição "GET" for enviada para "/buscar-acomodacoes?data_ida=2025-03-10&data_volta=2025-03-15"
Then o status da resposta deve ser "400"
And o JSON da resposta deve conter a mensagem "O destino é obrigatório."

Scenario: Buscar acomodações com datas inválidas
Given a data de ida é "2025-03-15" e a data de volta é "2025-03-10"
When uma requisição "GET" for enviada para "/buscar-acomodacoes?destino=Recife&data_ida=2025-03-15&data_volta=2025-03-10"
Then o status da resposta deve ser "400"
And o JSON da resposta deve conter a mensagem "Data de ida deve ser anterior à data de volta."

Scenario: Buscar acomodações para 4 hóspedes
Given o RoomService retorna uma lista de acomodações adequadas para "4" hóspedes em "Recife"
And a data de ida é "2025-03-10" e a data de volta é "2025-03-15"
When uma requisição "GET" for enviada para "/buscar-acomodacoes?destino=Recife&num_pessoas=4&data_ida=2025-03-10&data_volta=2025-03-15"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser uma lista de acomodações para 4 hóspedes
And a acomodação com id "303" e capacidade para "4" pessoas está na lista
And a acomodação com id "404" e capacidade para "6" pessoas está na lista

Scenario: Buscar acomodações para 10 hóspedes sem acomodações disponíveis
Given o RoomService retorna uma lista vazia para "10" hóspedes em "Recife"
And a data de ida é "2025-03-10" e a data de volta é "2025-03-15"
When uma requisição "GET" for enviada para "/buscar-acomodacoes?destino=Recife&num_pessoas=10&data_ida=2025-03-10&data_volta=2025-03-15"
Then o status da resposta deve ser "200"
And a mensagem "Não há acomodações disponíveis para o número de pessoas informado. Tente diminuir o número de hóspedes e busque novamente." deve ser retornada

Scenario: Nenhuma acomodação disponível para o destino e datas selecionadas
Given o RoomService não encontra acomodações disponíveis para "Recife" entre "2025-03-10" e "2025-03-15"
When uma requisição "GET" for enviada para "/buscar-acomodacoes?destino=Recife&data_ida=2025-03-10&data_volta=2025-03-15"
Then o status da resposta deve ser "404"
And a mensagem "Não há acomodações disponíveis no destino e nas datas pesquisadas." deve ser retornada
