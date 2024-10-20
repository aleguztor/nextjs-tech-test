import { SessionProvider } from "next-auth/react"
import React from "react"
import Home from "./index"

describe("<Home />", () => {
  it("Shows HOME with data when is not logged", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    )
    cy.findByText("Hello!").should("exist")
  })
})

describe("<Home />", () => {
  before(() => {
    cy.intercept("GET", "/api/ventas?year=2024", {
      statusCode: 200,
      body: [],
    }).as("getData")
  })
  it("Shows HOME with data when is logged", () => {
    // see: https://on.cypress.io/mounting-react

    cy.loginApp()
    // cy.wait("@session")
    cy.mount(
      <SessionProvider
        session={{
          expires: new Date().toISOString(),
          user: {
            id: "1231232",
            email: "adas@asdas.com",
            name: "asda",
            lc_username: null,
            org: null,
          },
        }}
      >
        <Home />
      </SessionProvider>
    )
    cy.findByText("Hello!").should("not.exist")
  })
})
