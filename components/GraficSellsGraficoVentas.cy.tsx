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
    cy.mount(<GraficoVentas />)
    cy.intercept("GET", "/api/ventas?year=2021", {
      statusCode: 200,
      body: [],
    }).as("getData")
    cy.get("select").select("2021")
    cy.get("select#year option:selected").should("have.text", "2021")
  })

  it("open notes and text always there when pressing x and reopening", () => {
    cy.mount(<GraficoVentas />)
    cy.get("button").click()
    cy.get("textarea").clear()
    cy.get("textarea").type("SE MANTIENE EL TEXTO")
    cy.get("#nVentas > header > button").click()
    cy.get("button").click()
    cy.get("textarea").contains("SE MANTIENE EL TEXTO")
  })
})
