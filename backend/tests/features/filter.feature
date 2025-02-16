Feature: Filtrar acomodações disponíveis

Scenario: Filtrar acomodações Pet Friendly sem disponibilidade
Given o RoomService não encontra acomodações Pet Friendly para "Recife" entre "2025-03-10" e "2025-03-15" para "2" hóspedes
When uma requisição "GET" for enviada para "/acomodacoes?destino=Recife&data_ida=2025-03-10&data_volta=2025-03-15&num_pessoas=2&pet_friendly=true"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser uma lista vazia
And a mensagem "Nenhuma acomodação atende aos filtros selecionados." deve ser retornada

Scenario: Filtrar acomodações Wifi com disponibilidade
Given o RoomService retorna uma lista de acomodações disponíveis em "Recife" entre "2025-03-10" e "2025-03-15" para "2" hóspedes
And algumas acomodações possuem Wi-Fi como comodidade
When uma requisição "GET" for enviada para "/filtrar-acomodacoes?destino=Recife&data_ida=2025-03-10&data_volta=2025-03-15&num_pessoas=2&wifi=true"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser uma lista de acomodações que possuem Wi-Fi
And a acomodação com id "101" e nome "Hotel Recife" com Wi-Fi está na lista
And a acomodação com id "202" e nome "Pousada Beira-Mar" com Wi-Fi está na lista
And nenhuma acomodação sem Wi-Fi deve estar na lista

Scenario: Filtrar acomodações com café da manhã
Given o RoomService retorna uma lista de acomodações disponíveis em "Recife" entre "2025-03-10" e "2025-03-15" para "2" hóspedes
And algumas acomodações possuem cafe da manha como comodidade
When uma requisição "GET" for enviada para "/filtrar-acomodacoes?destino=Recife&data_ida=2025-03-10&data_volta=2025-03-15&num_pessoas=2&cafeDaManha=true"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser uma lista de acomodações que possuem cafe da manha
And nenhuma acomodação sem cafe da manha deve estar na lista
