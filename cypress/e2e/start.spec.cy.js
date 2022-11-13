describe("app successfully started", () => {
  it("started", () => {
    cy.visit("http://localhost:3000/")
  })
})