import { logInHelper, selectCompany } from "../support/commands";

Cypress.on("uncaught:exception", (err, runnable) => {
	// Returning false here prevents Cypress from failing the test on throws
	return false;
});

const url = "http://localhost:5173/login";

// Make sure .env files contains same email and password
const email = "a@a.com";
const password = "admin";

describe("Navigation works", () => {
	beforeEach(() => {
		logInHelper(url, email, password);
	});

	it("Home", () => {
		cy.get("[data-test-id='navigation-home']").should("exist").click();
	});

	it("Arenas", () => {
		cy.get("[data-test-id='navigation-arenas']").should("exist").click();
	});

	it("Compare", () => {
		cy.get("[data-test-id='navigation-compare']").should("exist").click();
	});
});

describe("Translation", () => {
	it("Language dropdown exist", () => {
		logInHelper(url, email, password);

		const dropDown = cy.get("[data-test-id='userNav-dropdown']");

		dropDown.click();

		cy.get("[data-test-id='languageSwitcher']").should("exist");
	});
});

describe("Company", () => {
	it("Select company", () => {
		logInHelper(url, email, password);

		selectCompany();
	});
});

export { logInHelper };
