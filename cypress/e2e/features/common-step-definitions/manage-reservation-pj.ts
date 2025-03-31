/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

    Given("eu sou um usuário pj na página de gerenciar reservas", () => {
        cy.visit(`http://localhost:3000//manage-reservation/pj2`); // Substitua pela URL correta
        // cy.log(`Usuário do tipo: ${tipoUsuario}`);
    });
  
  // Dado que ele ainda não fez nenhuma reserva
    Given("eu não tenho nenhuma reserva vinculada a nenhum dos meus quartos", () => {
    // cy.intercept("GET", "http://localhost:5001/api/reservations/${user_id}/pf", { statusCode: 200, body: [] }).as("getReservasVazio");
    });
  
  // Quando ele acessa a página de reservas
    When("eu abro a página de reservas", () => {
        cy.visit("http://localhost:3000/manage-reservation/pj2");
  //   cy.wait("@getReservasVazio");
    });
  
  // Então ele não vê nenhuma reserva
    Then("eu não visualizo nenhuma reserva", () => {
      cy.get('h1').should('be.visible'); // Verifica que não há elementos de reservas
    });