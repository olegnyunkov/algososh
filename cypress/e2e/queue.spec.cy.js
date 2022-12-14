import {circle, circleChanging, circleDefault} from "./constants"

describe("queue test", () => {

  beforeEach(() => {
    cy.visit("/queue")
  })

  it("button disabled with empty input", () => {
    cy.get("button").eq(1).should("be.disabled")
  })

  it("add elements correctly", () => {
    cy.get("input").type("1234")
    cy.get("button").contains("Добавить").click()
    cy.get(circle).should("have.length", 7).eq(0).find(circleChanging)
    cy.get(circle).should("have.length", 7).eq(0).find(circleDefault)
    cy.get(circle).eq(0).contains("head")
    cy.get(circle).eq(0).contains("tail")
    cy.get(circle).eq(0).contains("1234")
    cy.get("input").type("567")
    cy.get("button").contains("Добавить").click()
    cy.get(circle).should("have.length", 7).eq(1).find(circleChanging)
    cy.get(circle).should("have.length", 7).eq(1).find(circleDefault)
    cy.get(circle).eq(0).contains("head")
    cy.get(circle).eq(1).contains("tail")
    cy.get(circle).eq(1).contains("567")
  })

  it("remove elements correctly", () => {
    cy.get("input").type("ab")
    cy.get("button").contains("Добавить").click()
    cy.wait(500)
    cy.get("input").type("cdef")
    cy.get("button").contains("Добавить").click()
    cy.wait(500)
    cy.get("input").type("ghi")
    cy.get("button").contains("Добавить").click()
    cy.wait(500)
    cy.get("button").contains("Удалить").click()
    cy.get(circle).should("have.length", 7).eq(0).find(circleChanging)
    cy.get(circle).should("have.length", 7).eq(0).find(circleDefault)
    cy.get(circle).eq(1).contains("head")
    cy.get("button").contains("Удалить").click()
    cy.get(circle).should("have.length", 7).eq(1).find(circleChanging)
    cy.get(circle).should("have.length", 7).eq(1).find(circleDefault)
    cy.get(circle).eq(2).contains("head")
    cy.get(circle).eq(1).should("not.have.text")
  })

  it("reset elements correctly", () => {
    cy.get("input").type("123")
    cy.get("button").contains("Добавить").click()
    cy.wait(500)
    cy.get("input").type("45")
    cy.get("button").contains("Добавить").click()
    cy.wait(500)
    cy.get("input").type("6")
    cy.get("button").contains("Добавить").click()
    cy.wait(500)
    cy.get("button").contains("Очистить").click()
    cy.get(circle).should("have.length", 7).as("circles")
    cy.get("@circles").each((item) => {
      cy.wrap(item).should("not.have.text")
      cy.wrap(item).find(circleDefault)
    })
  })
})