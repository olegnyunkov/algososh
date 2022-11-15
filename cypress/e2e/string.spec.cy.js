import {circle, circleModified, circleChanging} from "./constants"

describe("string test", () => {

  beforeEach(() => {
    cy.visit("/recursion")
  })

  const inputData = "123fg"

  it("button disabled with empty input", () => {
    cy.get("button").eq(1).should("be.disabled")
  })

  it("render elements", () => {
    cy.get("input").type(inputData)
    cy.get("button").contains("Развернуть").click()
    cy.get(circle)
      .should("have.length", 5)
      .each((item, index) => {
        cy.wrap(item).contains(inputData[index])
      })
    cy.get(circle)
      .should("have.length", 5)
      .each((item, index) => {
        if(index < 3) {
          cy.wrap(item).find(circleChanging)
        }
      })
    cy.get(circle)
      .should("have.length", 5)
      .each((item, index) => {
        cy.wrap(item).find(circleModified)
      })
  })
})