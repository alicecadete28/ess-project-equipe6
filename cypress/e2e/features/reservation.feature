Feature: Reservation Details Page

  Scenario: Page loads and displays hotel title
    Given I am on the reservation details page
    When the page loads
    Then I should see the hotel name

  Scenario: User clicks to edit check-in date
    Given I am on the reservation details page
    When I click on "editar check-in"
    Then a calendar modal should appear

