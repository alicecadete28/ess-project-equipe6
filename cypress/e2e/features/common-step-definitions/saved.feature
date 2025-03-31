Feature: Salvos
Scenario: O usuário não consegue acessar os quartos salvos
Given  o usuário está na página de resultados e não está logado no sistema 
When clica no botão “salvos”
Then ele é redirecionado para a pagina de salvos mas ela não carrega


