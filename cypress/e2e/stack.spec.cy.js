describe("stack test", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/stack")
  })

  it("button disabled with empty input", () => {
    cy.get("button").eq(1).should("be.disabled")
  })

  it("add elements correctly", () => {
    cy.get("input").type("12as")
    cy.get("button").contains("Добавить").click()
    cy.get("*[class^=circle_content]").should("have.length", 1).find("[class*=circle_changing]")
    cy.get("*[class^=circle_content]").should("have.length", 1).find("[class*=circle_default]")
    cy.get("*[class^=circle_content]").contains("12as")
    cy.get("*[class^=circle_content]").contains("top")
  })

})