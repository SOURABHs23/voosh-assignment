describe("Basic Page Functionality", () => {
  before(() => {
    cy.visit("/");
    cy.get("input[name=email]").type("demorobot@gmail.com");
    cy.get("input[name=password]").type("123abcABC!");
    cy.get("button[type=submit]").click();
  });

  it("can create a new board, list, and cards", () => {
    cy.get(".create-board-button").click();
    cy.get('input[placeholder="Board Name"]').type("Board created by Cypress");
    cy.get('input[placeholder="Description"]').type("Beep boop.");
    cy.get(".create-board-button-create").click();
    cy.get(".board-item").last().click();
    cy.get(".create-list-button").click();
    cy.get('input[placeholder="List Name"]').type("I am");
    cy.contains("button", "Create List").click();
    cy.get(".add-card-button").last().click();
    cy.get('input[placeholder="Card Name"]').type("not");
    cy.get('textarea[placeholder="Description"]').type("a robot.");
    cy.contains("button", "Create").click();
    cy.get(".create-list-button").click();
    cy.get('input[placeholder="List Name"]').type("Beep boop");
    cy.contains("button", "Create List").click();
    cy.get(".card").last().click();
  });
});
