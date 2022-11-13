describe("routing successful", () => {

  it("string page opened", () => {
    cy.visit("http://localhost:3000/recursion")
  })

  it("fibonacci page opened", () => {
    cy.visit("http://localhost:3000/fibonacci")
  })

  it("sorting page opened", () => {
    cy.visit("http://localhost:3000/sorting")
  })

  it("stack page opened", () => {
    cy.visit("http://localhost:3000/stack")
  })

  it("queue page opened", () => {
    cy.visit("http://localhost:3000/queue")
  })

  it("queue page opened", () => {
    cy.visit("http://localhost:3000/list")
  })
})