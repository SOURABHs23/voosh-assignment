describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads successfully and includes /login in the URL", () => {
    cy.url().should("include", "/login");
  });

  it('has a title "Sign in"', () => {
    cy.get("h1").contains("Sign in");
  });

  it("has an email input", () => {
    cy.get("input[name=email]").should("be.visible");
  });

  it("has a password input", () => {
    cy.get("input[name=password]").should("be.visible");
  });

  it("has a submit button", () => {
    cy.get("button[type=submit]").should("be.visible");
  });

  it("can log in with valid credentials", () => {
    cy.get("input[name=email]").type("alejandro97ss2@gmail.com");
    cy.get("input[name=password]").type("123abcABC!");
    cy.get("button[type=submit]").click();
  });
});

