Cypress.on("uncaught:exception", (err, runnable) => {
	// Returning false here prevents Cypress from failing the test on throws
	return false;
});

const url = "http://localhost:5173";

// Make sure .env files contains same email and password
const email = "a@a.com";
const password = "admin";

describe("Navigation works", () => {
	it("Home", () => {
		logInHelper();
		cy.get("[data-test-id='navigation-home']").should("exist").click();
	});

	it("Arenas", () => {
		logInHelper();
		cy.get("[data-test-id='navigation-arenas']").should("exist").click();
	});

	it("Compare", () => {
		logInHelper();
		cy.get("[data-test-id='navigation-compare']").should("exist").click();
	});
});

describe("Translation", () => {
	it("Language dropdown exist", () => {
		logInHelper();

		const dropDown = cy.get("[data-test-id='userNav-dropdown']");

		dropDown.click();

		cy.get("[data-test-id='languageSwitcher']").should("exist");
	});
});

const logInHelper = () => {
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
