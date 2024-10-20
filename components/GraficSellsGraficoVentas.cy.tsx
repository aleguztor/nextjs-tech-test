import React from "react"
import GraficoVentas from "./GraficSells"

describe("<GraficoVentas />", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/ventas?year=2024", {
      statusCode: 200,
      body: [],
    }).as("getData")
  })

  it("change to other year, this example is 2021", () => {
    // see: https://on.cypress.io/mounting-react
    // cy.wait("@getData")

    cy.mount(<GraficoVentas />)
    cy.intercept("GET", "/api/ventas?year=2021", {
      statusCode: 200,
      body: [],
    }).as("getData")
    cy.get("select").select("2021")
    cy.get("select#year option:selected").should("have.text", "2021")
  })

  // it("continue", () => {
  //   // see: https://on.cypress.io/mounting-react
  //   cy.mount(<GraficoVentas />)
  // })
  // after

  //   it("select other option", () => {
  //     cy.mount(<GraficoVentas />)

  //     cy.intercept("GET", process.env.NEXTAUTH_URL+`http://localhost:3000/api/ventas?year=2021`, {
  //       statusCode: 200,
  //       body: [],
  //     }).as("getData")
  //     cy.mount(<GraficoVentas />)
  //   })
})
