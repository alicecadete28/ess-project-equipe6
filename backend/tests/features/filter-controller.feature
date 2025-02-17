Feature: Filtrar acomodações disponíveis

Scenario: Acomodações com Wi-Fi disponíveis
Given o RoomRepository possui acomodações disponíveis em "Recife" entre "2025-03-10" e "2025-03-15" para "2" hóspedes
And algumas acomodações possuem Wi-Fi como comodidade
When uma requisição GET for enviada para "/api/filtrar-acomodacoes?destino=Recife&data_ida=2025-03-10&data_volta=2025-03-15&num_pessoas=2&wifi=true"
Then o status da resposta deve ser "200"
And a resposta deve ter um JSON com uma lista de acomodações que possuem Wi-Fi
And a acomodação com id "101" e nome "Hotel Recife" com Wi-Fi está na lista
And a resposta não deve conter acomodações sem Wi-Fi

Scenario: Acomodações com café da manhã disponíveis
Given o RoomRepository possui acomodações disponíveis em "Recife" entre "2025-03-10" e "2025-03-15" para "2" hóspedes
And algumas acomodações possuem café da manhã como comodidade
When uma requisição GET for enviada para "/api/filtrar-acomodacoes?destino=Recife&data_ida=2025-03-10&data_volta=2025-03-15&num_pessoas=2&cafeDaManha=true"
Then o status da resposta deve ser "200"
And a resposta deve ter um JSON com uma lista de acomodações que possuem café da manhã
And a resposta não deve conter acomodações sem café da manhã
