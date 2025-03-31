import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página de resultados e não está logado no sistema", () => {
  cy.clearLocalStorage();
  cy.visit("http://localhost:3000/resultados");
});

When("clica no botão “salvos”", () => {
  cy.get("#botaoSalvos").click();
});

Then("ele é redirecionado para a pagina de salvos mas ela não carrega", () => {
  cy.url().should('include', '/saved');
  //cy.get(".error-message").should("be.visible"); // Exemplo de verificação de erro
});
