Feature: Gerenciar reservas PF

Scenario: o usuário pj não possui reservas vinculadas a nenhum dos seus quartos
    Given eu sou um usuário pj na página de gerenciar reservas
    And eu não tenho nenhuma reserva vinculada a nenhum dos meus quartos
    When eu abro a página de reservas
    Then eu não visualizo nenhuma reserva

# Scenario: o usuário pj possui reservas vinculadas ao seu quarto
#     Given eu estou logado como um usuário pj de id: "12732"
#     And eu tenho uma reserva vinculada à algum de meus quartos
#     When eu abro a página de reservas
#     Then eu visualizo uma reserva

# Scenario: o usuário pj deseja cancelar uma reserva vinculada ao seu quarto
#     Given eu estou logado como um usuário pj de id: "12"
#     And eu tenho uma reserva vinculada à algum de meus quartos
#     When eu abro a página de reservas
#     And eu clico no card da reserva de id "1"
#     And eu clico no botão de cancelar reserva
#     Then eu visualizo uma mensagem de sucesso
#     And eu volto para a página de reservas
#     And eu não visualizo mais a reserva



