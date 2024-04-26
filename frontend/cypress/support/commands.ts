/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export const logInHelper = (url: string, email: string, password: string) => {
	cy.visit(url);
	// Type into email field
	cy.get("[data-test-id=logInEmailField]").type(email);

	// Type into password field
	cy.get("[data-test-id=logInPasswordField]").type(password);

	// Assert that the input fields have the correct values
	cy.get("[data-test-id=logInEmailField]").should("have.value", email);
	cy.get("[data-test-id=logInPasswordField]").should("have.value", password);

	// Click login
	cy.get("[data-test-id=logInButton]").click();
};

export const selectCompany = () => {
	const dropDown = cy.get("[data-test-id='userNav-dropdown']");
	dropDown.click();

	// Wait for 1 second
	cy.wait(1000);

	cy.get("[data-test-id='company-selector-button']").click();

	cy.contains("compare_win_dummy").click();
};
