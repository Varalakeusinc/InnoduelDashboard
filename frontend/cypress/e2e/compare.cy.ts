import { logInHelper } from "./basics.cy";

const url = "http://localhost:5173";

const email = "a@a.com";
const password = "admin";

describe("Compare Component", () => {
	beforeEach(() => {
		logInHelper(url, email, password);
		cy.get("[data-test-id='navigation-compare']").should("exist").click();
	});

	it("selects a specific company and loads arenas", () => {
		cy.get("[data-test-id='userNav-dropdown']").click();
		cy.wait(1000); // Wait for the dropdown to open
		cy.get("[data-test-id='company-selector-button']").click();
		cy.contains("Ilari admin").click();
		cy.wait(2000);

		cy.get("[aria-label='Select Arena']")
			.should("exist")
			.eq(0)
			.click({ force: true });
		// IT SHOULD FIND THIS ARENA
		cy.contains("Vahvuudet").click();
	});

	it("renders the container element", () => {
		cy.get(".container.mx-auto").should("exist");
	});

	it("renders the Plus and Minus buttons", () => {
		cy.get(".fixed.top-40.right-4 > Button").should("have.length", 2);
	});

	it("minus button should be disabled", () => {
		cy.get(".fixed.top-40.right-4 > Button:nth-child(2)").should(
			"be.disabled"
		);
	});

	it("adds a new view and removes it when clicking Plus and then Minus buttons", () => {
		cy.get(".fixed.top-40.right-4 > Button:first-child").click();
		cy.get(".fixed.top-40.right-4 > Button:nth-child(2)").click();
	});
});
