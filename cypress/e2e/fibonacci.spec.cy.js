import {circle} from "./constants"

describe("fibonacci test", () => {

  beforeEach(() => {
    cy.visit("/fibonacci")
  })

  it("button disabled with empty input", () => {
    cy.get("button").eq(1).should("be.disabled")
  })

  it("generate numbers correctly", () => {
    cy.get("input").type("19")
    cy.get("button").contains("Рассчитать").click()
    cy.wait(11000)
    cy.get(circle).should("have.length", 20)
    cy.get(circle).last().contains("4181")
  })
})