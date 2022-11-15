import {circle, circleChanging, circleDefault} from "./constants"

describe("stack test", () => {

  beforeEach(() => {
    cy.visit("/stack")
  })

  it("button disabled with empty input", () => {
    cy.get("button").eq(1).should("be.disabled")
  })

  it("add elements correctly", () => {
    cy.get("input").type("12as")
    cy.get("button").contains("Добавить").click()
    cy.get(circle).should("have.length", 1).find(circleChanging)
    cy.get(circle).should("have.length", 1).find(circleDefault)
    cy.get(circle).contains("12as")
    cy.get(circle).contains("top")
  })

  it("remove elements correctly", () => {
    cy.get("input").type("zxcv")
    cy.get("button").contains("Добавить").click()
    cy.get(circle).should("have.length", 1)
    cy.get("button").contains("Удалить").click()
    cy.get(circle).should("have.length", 1).find(circleChanging)
    cy.get(circle).should("not.have.length", 1)
  })

  it("reset elements correctly", () => {
    cy.get("input").type("1234")
    cy.get("button").contains("Добавить").click()
    cy.wait(1000)
    cy.get("input").type("5678")
    cy.get("button").contains("Добавить").click()
    cy.get(circle).should("have.length", 2)
    cy.get("button").contains("Очистить").click()
    cy.get(circle).should("not.have.length", 2)
  })
})