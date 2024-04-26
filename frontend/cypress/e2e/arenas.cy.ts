import { logInHelper } from "./basics.cy";

const url = "http://localhost:5173";

const email = "a@a.com";
const password = "admin";

describe("Arenas Component", () => {
	beforeEach(() => {
		logInHelper(url, email, password);
		cy.get("[data-test-id='navigation-arenas']").should("exist").click();
	});

	it("should render arenas correctly", () => {
		cy.get(".grid").should("exist");
		cy.get(".grid > a").should("have.length.greaterThan", 0);
	});

	it("should paginate correctly", () => {
		// Click on next page button
		cy.get("[aria-label='Next page']").click();
		cy.get(".grid > a").should("have.length.greaterThan", 0);

		// Click on previous page button
		cy.get("[aria-label='Previous page']").click();
		cy.get(".grid > a").should("have.length.greaterThan", 0);
	});

	it("should navigate to individual arena pages", () => {
		// Click on the first arena link
		cy.get(".grid > a").first().click();
		cy.url().should("include", "/arena/");
	});
});
