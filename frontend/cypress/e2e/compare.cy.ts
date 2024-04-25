import logInHelper from "./basics.cy";

const url = "http://localhost:5173";

const email = "a@a.com";
const password = "admin";

describe("Compare Component", () => {
    beforeEach(() => {
        logInHelper(url, email, password);
        cy.get("[data-test-id='navigation-compare']").should("exist").click();
    });

    it("renders the container element", () => {
        cy.get(".container.mx-auto").should("exist");
    });

    it("renders the Plus and Minus buttons", () => {
        cy.get(".fixed.top-40.right-4 > Button").should("have.length", 2);
    });

    it("minus button should be disabled", () => {
        cy.get(".fixed.top-40.right-4 > Button:nth-child(2)").should('be.disabled');
    });

    it("adds a new view and removes it when clicking Plus and then Minus buttons", () => {
        cy.get(".fixed.top-40.right-4 > Button:first-child").click();
        cy.get(".fixed.top-40.right-4 > Button:nth-child(2)").click();
    });

    
});
