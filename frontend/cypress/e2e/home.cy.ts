import { logInHelper } from "../support/commands";

const url = "http://localhost:5173";

const email = "a@a.com";
const password = "admin";

describe("HomePage Tests", () => {
	beforeEach(() => {
		// Login and navigate to the correct page
		logInHelper(url, email, password);
		cy.get("[data-test-id='navigation-compare']").should("exist").click();
	});

	it("handles date changes correctly", () => {
		const startDate = "2023-01-01";
		const endDate = "2023-02-01";

		// Alias the date pickers for easier reference
		cy.get("[data-test-id='startDate']", { timeout: 10000 })
			.should("be.visible")
			.first()
			.as("startDatePicker");

		cy.get("[data-test-id='endDate']")
			.should("be.visible")
			.last()
			.as("endDatePicker");

		// Interact with the date pickers
		cy.get("@startDatePicker")
			.click()
			.clear()
			.type(startDate + "{enter}");
		cy.get("@endDatePicker")
			.click()
			.clear()
			.type(endDate + "{enter}");

		// Assert the values are updated
		cy.get("@startDatePicker")
			.find("input")
			.should("have.value", startDate);
		cy.get("@endDatePicker").find("input").should("have.value", endDate);
	});

	it("changes display mode via select dropdown", () => {
		// Select 'month' from the dropdown and verify the value changes
		cy.get("select").select("month").should("have.value", "month");
	});

	it("displays correct bar charts after data loads", () => {
		// Ensure that the chart container is visible and contains the expected data
		cy.get(".barChart").should("be.visible").and("contain", "Ideas");
		cy.get(".barChart").should("be.visible").and("contain", "Votes");
	});
});
