/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Cenário: Page loads and displays hotel title
Given('I am on the reservation details page', () => {
  cy.visit("http://localhost:3000/reservation");
});

When('the page loads', () => {
  cy.get('h1').should('be.visible');
});

Then('I should see the hotel name', () => {
  cy.get('h1').invoke('text').should('not.be.empty');
});

// Cenário: User clicks to edit check-in date
When('I click on "editar check-in"', () => {
  cy.contains('button', 'editar check-in').click();
});

Then('a calendar modal should appear', () => {
  cy.get('.fixed.inset-0').should('be.visible'); // ou use outro seletor específico do modal
  cy.contains('Selecione nova data de entrada').should('be.visible');
});

