describe('Compare Page', () => {
    it('should display the Compare page', () => {
      cy.visit('/compare');
  
      // Example assertions
      cy.get('[data-testid="add-view-button"]').should('be.visible');
      cy.get('[data-testid="remove-view-button"]').should('be.visible');
    });
  
    it('should add a new view on button click', () => {
      cy.visit('/compare');
  
      cy.get('[data-testid="add-view-button"]').click();
      cy.get('[data-testid="view"]').should('have.length', 2); 
    });
  
  });