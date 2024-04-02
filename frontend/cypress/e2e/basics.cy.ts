Cypress.on("uncaught:exception", (err, runnable) => {
	// Returning false here prevents Cypress from failing the test on throws
	return false;
});

const url = "http://localhost:5173";

describe("Navigation works", () => {
	it("Home", () => {
		cy.visit(url);
		cy.get("[data-test-id='navigation-home']").should("exist");
	});

	it("Arenas", () => {
		cy.visit(url);
		cy.get("[data-test-id='navigation-arenas']").should("exist");
	});

	it("Compare", () => {
		cy.visit(url);
		cy.get("[data-test-id='navigation-compare']").should("exist");
	});
});

describe("Translation", () => {
	it("Language dropdown exist", () => {
		cy.visit(url);

		const dropDown = cy.get("[data-test-id='userNav-dropdown']");

		dropDown.click();

		cy.get("[data-test-id='languageSwitcher']").should("exist");
	});
});
