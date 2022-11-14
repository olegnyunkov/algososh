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

  it("remove elements correctly", () => {
    cy.get("input").type("zxcv")
    cy.get("button").contains("Добавить").click()
    cy.get("*[class^=circle_content]").should("have.length", 1)
    cy.get("button").contains("Удалить").click()
    cy.get("*[class^=circle_content]").should("have.length", 1).find("[class*=circle_changing]")
    cy.get("*[class^=circle_content]").should("not.have.length", 1)
  })

  it("reset elements correctly", () => {
    cy.get("input").type("1234")
    cy.get("button").contains("Добавить").click()
    cy.wait(1000)
    cy.get("input").type("5678")
    cy.get("button").contains("Добавить").click()
    cy.get("*[class^=circle_content]").should("have.length", 2)
    cy.get("button").contains("Очистить").click()
    cy.get("*[class^=circle_content]").should("not.have.length", 2)
  })
})