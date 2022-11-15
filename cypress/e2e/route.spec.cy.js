describe("routing successful", () => {

  it("string page opened", () => {
    cy.visit("/recursion")
  })

  it("fibonacci page opened", () => {
    cy.visit("/fibonacci")
  })

  it("sorting page opened", () => {
    cy.visit("/sorting")
  })

  it("stack page opened", () => {
    cy.visit("/stack")
  })

  it("queue page opened", () => {
    cy.visit("/queue")
  })

  it("queue page opened", () => {
    cy.visit("/list")
  })
})