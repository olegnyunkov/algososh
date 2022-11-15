import {circle, circleModified, circleChanging, circleDefault} from "./constants"


describe("list test", () => {

  beforeEach(() => {
    cy.visit("/list")
  })

  it("button disabled with empty input", () => {
    cy.get("button").eq(1).should("be.disabled")
    cy.get("button").eq(2).should("be.disabled")
    cy.get("button").eq(5).should("be.disabled")
    cy.get("button").eq(6).should("be.disabled")
  })

  it("renders elements by default correctly", () => {
    cy.get(circle).should("have.length", 4).as("circles")
    cy.get("@circles").each((item) => {
      cy.wrap(item).find(circleDefault)
    })
    cy.get("@circles").eq(0).contains("head")
    cy.get("@circles").eq(3).contains("tail")
  })

  it("add elements to head correctly", () => {
    cy.get("input").eq(0).type("halo")
    cy.get("button").contains("Добавить в head").click()
    cy.get(circle).eq(0).contains("halo")
    cy.wait(500)
    cy.get(circle).eq(0).find(circleModified)
    cy.get(circle).eq(0).contains("halo")
    cy.get(circle).should("have.length", 5)
    cy.get(circle).eq(0).contains("head")
    cy.get(circle).eq(0).find(circleDefault)
  })

  it("add elements to tail correctly", () => {
    cy.get("input").eq(0).type("imdn")
    cy.get("button").contains("Добавить в tail").click()
    cy.get(circle).eq(3).contains("imdn")
    cy.wait(500)
    cy.get(circle).eq(4).find(circleModified)
    cy.get(circle).eq(4).contains("imdn")
    cy.get(circle).should("have.length", 5)
    cy.get(circle).eq(4).contains("tail")
    cy.get(circle).eq(4).find(circleDefault)
  })

  it("remove elements from head correctly", () => {
    cy.get(circle).should("have.length", 4)
    cy.get("button").contains("Удалить из head").click()
    cy.get(circle).eq(0).contains("head")
    cy.get(circle).eq(0).find(circleChanging)
    cy.wait(500)
    cy.get(circle).eq(0).find(circleDefault)
    cy.get(circle).should("have.length", 3)
    cy.get(circle).eq(0).contains("head")
  })

  it("remove elements from tail correctly", () => {
    cy.get(circle).should("have.length", 4)
    cy.get("button").contains("Удалить из tail").click()
    cy.get(circle).eq(3).find(circleChanging)
    cy.wait(500)
    cy.get(circle).eq(2).find(circleDefault)
    cy.get(circle).should("have.length", 3)
    cy.get(circle).eq(2).contains("tail")
  })

  it("add elements by index correctly", () => {
    cy.get("input").eq(0).type("doom")
    cy.get("input").eq(1).type("2")
    cy.get("button").contains("Добавить по индексу").click()
    cy.get(circle).eq(0).contains("doom")
    cy.get(circle).eq(0).find(circleChanging)
    cy.wait(500)
    cy.get(circle).eq(1).contains("doom")
    cy.get(circle).eq(0).find(circleChanging)
    cy.get(circle).eq(1).find(circleChanging)
    cy.wait(500)
    cy.get(circle).eq(2).contains("doom")
    cy.get(circle).eq(0).find(circleChanging)
    cy.get(circle).eq(1).find(circleChanging)
    cy.get(circle).eq(2).find(circleChanging)
    cy.get(circle).eq(2).find(circleModified)
    cy.get(circle).eq(2).contains("doom")
    cy.get(circle).should("have.length", 5)
    cy.get(circle).eq(2).find(circleDefault)
  })

  it("remove elements by index correctly", () => {
    cy.get("input").eq(1).type("2")
    cy.get("button").contains("Удалить по индексу").click()
    cy.get(circle).eq(0).find(circleChanging)
    cy.wait(500)
    cy.get(circle).eq(0).find(circleChanging)
    cy.get(circle).eq(1).find(circleChanging)
    cy.wait(500)
    cy.get(circle).eq(0).find(circleChanging)
    cy.get(circle).eq(1).find(circleChanging)
    cy.get(circle).eq(2).find(circleChanging)
    cy.get(circle).should("have.length", 3)
    cy.get(circle).eq(2).find(circleDefault)
  })
})