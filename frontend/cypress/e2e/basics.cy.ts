Cypress.on("uncaught:exception", (err, runnable) => {
	// Returning false here prevents Cypress from failing the test on throws
	return false;
});

const url = "http://localhost:5173/login";

// Make sure .env files contains same email and password
const email = "a@a.com";
const password = "admin";

describe("Navigation works", () => {
	it("Home", () => {
		logInHelper(url, email, password);
		cy.get("[data-test-id='navigation-home']").should("exist").click();
	});

	it("Arenas", () => {
		logInHelper(url, email, password);
		cy.get("[data-test-id='navigation-arenas']").should("exist").click();
	});

	it("Compare", () => {
		logInHelper(url, email, password);
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

const selectCompany = () => {
	const dropDown = cy.get("[data-test-id='userNav-dropdown']");
	dropDown.click();

	// Wait for 1 second
	cy.wait(1000);

	const companySelector = cy
		.get("[data-test-id='company-selector-button']")
		.click();

	cy.contains("Default company").click();
};
