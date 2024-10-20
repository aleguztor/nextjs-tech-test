import { SessionProvider } from "next-auth/react"
import React from "react"
import Home from "./index"

describe("<Home />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react

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
  })
})
