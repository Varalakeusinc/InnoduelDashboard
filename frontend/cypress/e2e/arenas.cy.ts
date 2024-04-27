import { logInHelper } from "../support/commands";

Cypress.on("uncaught:exception", (err, runnable) => {
	// Returning false here prevents Cypress from failing the test on throws
	return false;
});

const url = "http://localhost:5173";

const email = "a@a.com";
const password = "admin";

describe("Arenas Component", () => {
	beforeEach(() => {
		logInHelper(url, email, password);
		cy.get("[data-test-id='navigation-arenas']").click();
	});

	it("should render arenas correctly", () => {
		cy.get(".grid").should("exist");
		cy.get(".grid > a").should("have.length.greaterThan", 0);
	});

	it("should paginate correctly", () => {
		cy.get("[aria-label='Next page']").click();
		cy.get(".grid > a").should("have.length.greaterThan", 0);

		cy.get("[aria-label='Previous page']").click();
		cy.get(".grid > a").should("have.length.greaterThan", 0);
	});

	it("should navigate to individual arena pages", () => {
		cy.get(".grid > a").first().click();
		cy.url().should("include", "/arena/");
	});
});
