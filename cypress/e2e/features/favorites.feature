Feature: Favorites
Scenario: O usuário não consegue acessar os quartos favoritos
Given que o usuário não está logado no sistema e está na pagina de resultados
When clica no botão “favoritos”
Then ele é redirecionado para a pagina de de favoritos mas não carrega


