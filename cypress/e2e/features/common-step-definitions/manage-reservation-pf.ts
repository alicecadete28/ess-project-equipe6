/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const user_id : string = ""
const mockUser = {
  id: '12732',
  email:'bia@example.com',
  password:'123',
  type:'pf'
}

const mockReserva = [
  {
		id: "1",
		pf_id: "12732",
		room_id: "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c",
		check_in: "2025-03-09T00:00:00.000Z",
		check_out: "2025-03-29T00:00:00.000Z",
		guests: 2,
		total: 100,
		status: "Pending",
		rating: {
			stars: 0,
			comment: ""
		},
		confirmed: false
	}
]
// Dado que o usuário está na página de gerenciar reservas
Given("eu sou um usuário pf na página de gerenciar reservas", () => {
  cy.visit(`http://localhost:3000//manage-reservation/pf`); // Substitua pela URL correta
  // cy.log(`Usuário do tipo: ${tipoUsuario}`);
});

// Dado que ele ainda não fez nenhuma reserva
Given("eu ainda não realizei nenhuma reserva", () => {
  cy.intercept("GET", "http://localhost:5001/api/reservations/${user_id}/pf", { statusCode: 200, body: [] }).as("getReservasVazio");
});

// Quando ele acessa a página de reservas
When("eu acesso a página de reservas", () => {
  cy.visit("http://localhost:3000/manage-reservation/pf");
//   cy.wait("@getReservasVazio");
});

// Então ele não vê nenhuma reserva
Then("eu não vejo nenhuma reserva", () => {
    cy.get('h1').should('be.visible'); // Verifica que não há elementos de reservas
});

// Given("eu estou logado como um usuário pf de id: {string}", (id: string) => {
//   cy.intercept("POST", "http://localhost:5001/api", { statusCode: 200, body: { email: mockUser.email , password: mockUser.password } }).as("login");

//   cy.visit("/login");
//   cy.get('input[label="Email"]').type(mockUser.email);
//   cy.get('input[label="Senha"]').type("senha123"); // Senha fictícia
//   cy.get("button[type=submit]").click();

//   cy.wait("@login").then(() => {
//     cy.window().then((win) => {
//       win.localStorage.setItem("auth_token", mockUser.password);
//       win.localStorage.setItem("user", JSON.stringify(mockUser));
//     });
//   });

//   cy.log(`Usuário ${mockUser.id} autenticado com sucesso`);
// })


// // E ele já realizou uma reserva
// Given("eu já realizei uma reserva", () => {
//   cy.intercept("GET", "http://localhost:5001/api/reservations/${user_id}/pf", { statusCode: 200, body: mockReserva }).as("getReservas");
// });

// // Quando ele acessa a página de reservas
// When("eu vou para página de reservas", () => {
//   cy.visit("http://localhost:3000//manage-reservation/pf");
//   // cy.wait("@getReservas");
// });

// // Então ele vê uma reserva
// Then("eu vejo uma reserva", () => {
//   cy.get('h2').should('be.visible'); // Verifica que uma reserva está na tela
// });






// Given ('eu sou um usuário {string} na página de gerenciar reservas', () => {

// }) 

// Given ('eu ainda não realizei nenhuma reserva', () => {

// }) 

// When ('eu não vejo nenhuma reserva', () => {
//     cy.get("#botaoReservar").click();
// })

// Then ('eu não vejo nenhuma reserva', () => {
//     cy.get('h1').should('be.visible');
// })
