import { logInHelper } from "../support/commands";

const url = "http://localhost:5173";

const email = "a@a.com";
const password = "admin";

describe('HomePage Tests', () => {
  beforeEach(() => {
		logInHelper(url, email, password);
		cy.get("[data-test-id='navigation-compare']").should("exist").click();
	});

  it('loads the homepage successfully', () => {
    cy.url().should('include', '/'); 
  });


  it('loads and displays arenas, ideas, and votes summary', () => {
    cy.get('[data-cy=infoContainer]').should('have.length', 4).and('not.contain', 'Loading');
  });

  it('handles date changes', () => {
    const startDate = '2023-01-01';
    const endDate = '2023-02-01';
    cy.get('.ReactDatePicker').first().as('startDatePicker');
    cy.get('.ReactDatePicker').last().as('endDatePicker');

    cy.get('@startDatePicker').click().type('{selectall}' + startDate + '{enter}');
    cy.get('@endDatePicker').click().type('{selectall}' + endDate + '{enter}');

    cy.get('@startDatePicker').should('have.value', startDate);
    cy.get('@endDatePicker').should('have.value', endDate);
  });

  it('changes display mode via select dropdown', () => {
    cy.get('select').select('month').should('have.value', 'month');
  });

  it('displays correct bar charts after data loads', () => {
    cy.get('.barChart').should('be.visible').and('contain', 'Ideas');
    cy.get('.barChart').should('be.visible').and('contain', 'Votes');
  });

  it('renders notifications on error', () => {
    // Simulate an error, may need to stub network response
    cy.get('button').contains('Retry').click();
    cy.get('.notification').should('contain', 'Error');
  });

});

  