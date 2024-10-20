import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { setConfig } from "next/config"
import React from "react"
import "tailwindcss/colors"
import { Navbar } from "./Navbar"

describe("<Navbar />", () => {
  beforeEach(() => {
    setConfig({
      stylesheet: "../../global.css",
    })
    console.log("HCE ESTO")
  })
  it("Shows the navbar when you are not signed", () => {
    cy.mount(
      <SessionProvider session={null}>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </SessionProvider>
    )
    // cy.get(":nth-child(2) > button").click()
    // cy.get().should("contain", "/api/auth/providers")
  })

  // it("Shows the navbar when you are signed", () => {
  //   cy.mount(
  //     <SessionProvider
  //       session={{
  //         expires: new Date().toISOString(),
  //         user: {
  //           id: "1",
  //           email: "example@gmail.com",
  //           name: "example",
  //         },
  //       }}
  //     >
  //       <Navbar />
  //     </SessionProvider>
  //   )
  // })
})
