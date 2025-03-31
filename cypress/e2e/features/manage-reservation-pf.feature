Feature: Gerenciar reservas PF

Scenario: O usuário pf não possui reservas
    Given eu sou um usuário pf na página de gerenciar reservas
    And eu ainda não realizei nenhuma reserva
    When eu acesso a página de reservas
    Then eu não vejo nenhuma reserva

# Scenario: O usuário pf possui reservas
#     Given eu estou logado como um usuário pf de id: "12732"
#     And eu já realizei uma reserva
#     When eu vou para página de reservas
#     Then eu vejo uma reserva

# Scenario: O usuário pf deseja cancelar uma reserva
#     Given eu estou logado como um usuário pf de id: "12732"
#     And eu já realizei uma reserva
#     When eu vou para página de reservas
#     And eu clico no card da reserva de id "1"
#     And eu clico no botão de cancelar reserva
#     Then eu vejo uma mensagem de sucesso
#     And eu volto para a página de reservas
#     And eu não vejo mais a reserva

