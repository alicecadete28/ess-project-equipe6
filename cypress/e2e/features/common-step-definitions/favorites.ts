/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('que o usuário não está logado no sistema e está na pagina de resultados', () => {
  // Limpa o localStorage/token para garantir que o usuário não está logado
  cy.clearLocalStorage();
  cy.visit("http://localhost:3000/resultados");
});

When('clica no botão “favoritos”', () => {
  cy.get("#botaoFavoritos").click();
});

Then('ele é redirecionado para a pagina de de favoritos mas não carrega', () => {
  cy.url().should('include', '/favorites');
});
