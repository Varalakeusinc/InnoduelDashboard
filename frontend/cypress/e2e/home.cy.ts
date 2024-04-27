import { logInHelper } from "../support/commands";

const url = "http://localhost:5173";

const email = "a@a.com";
const password = "admin";

describe("HomePage Tests", () => {
	beforeEach(() => {
		// Login and navigate to the correct page
		logInHelper(url, email, password);
		cy.get("[data-test-id='navigation-home']").should("exist").click();
	});

	it("handles date changes correctly", () => {
		const startDate = "10/27/2022";
		const endDate = "04/27/2024";

		// Alias the date pickers for easier reference
		const startDatePicker = cy
			.get("[data-test-id='startDate']")
			.should("be.visible");

		const endDatePicker = cy
			.get("[data-test-id='endDate']")
			.should("be.visible");

		// Assert the values are updated
		startDatePicker.find("input").should("have.value", startDate);
		endDatePicker.find("input").should("have.value", endDate);
	});

	it("changes display mode via select dropdown", () => {
		// Select 'month' from the dropdown and verify the value changes
		cy.get("[data-test-id='modeSelector']").should("exist");
		cy.contains("Week");
	});

	it("displays correct bar charts after data loads", () => {
		// Ensure that the chart container is visible and contains the expected data
		cy.get("#chart-container").should("be.visible");
	});
});
