Cypress.on("uncaught:exception", (err, runnable) => {
	// Returning false here prevents Cypress from failing the test on throws
	return false;
});

describe("This should contain multiple 'it' tests", () => {
	it("This is a single test which is written in a side-effect free manner", () => {
		cy.visit("http://localhost:5173");
		cy.get(".html").wait(1000);
	});
});
