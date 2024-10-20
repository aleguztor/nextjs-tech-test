/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import "@testing-library/cypress/add-commands"

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("commonNav", () => {
  cy.findByText("Gold").should("exist")
  cy.findByText("Dark").should("exist")
  cy.findByText("Light").should("exist")
})

Cypress.Commands.add("loginApp", () => {
  cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session")
  cy.setCookie(
    "next-auth.session-token",
    "a valid cookie from your browser session"
  )
})
Cypress.Commands.add("logInRealFromImg", () => {
  if (cy.getCookie("next-auth.session-token").should("not.exist")) {
    cy.visit("/")
    cy.findByRole("singInGithub").click()
    cy.url().should("include", "https://github.com/login?client_id")
    cy.get("#login_field").type(Cypress.env("EMAIL_GITHUB_TEST"))
    cy.get("#password").type(Cypress.env("PASS_GITHUB_TEST"))
    cy.get(".position-relative > .btn").click()
    cy.url().then((u) => {
      if (u.includes("https://github.com/login/oauth/authorize")) {
        const buttonAuth = cy.get(".js-oauth-authorize-btn")
        if (buttonAuth.should("exist")) {
          buttonAuth.click()
        }
      } else {
        cy.get("button").click()
      }
    })
  }
  cy.visit("/")
})
Cypress.Commands.add("logInRealFromButton", () => {
  if (cy.getCookie("next-auth.session-token").should("not.exist")) {
    cy.visit("/")
    cy.findByRole("signInButon").click()
    cy.url().should("/api/auth/signin")
    cy.get("button").click

    cy.url().should("include", "https://github.com/login?client_id")
    cy.get("#login_field").type(Cypress.env("EMAIL_GITHUB_TEST"))
    cy.get("#password").type(Cypress.env("PASS_GITHUB_TEST"))
    cy.get(".position-relative > .btn").click()
    cy.url().then((u) => {
      if (u.includes("https://github.com/login/oauth/authorize")) {
        const buttonAuth = cy.get(".js-oauth-authorize-btn")
        if (buttonAuth.should("exist")) {
          buttonAuth.click()
        }
      } else {
        cy.get("button").click()
      }
    })
  }
  cy.visit("/")
})
declare global {
  namespace Cypress {
    interface Chainable {
      commonNav(): Chainable<void>
      loginApp(): Chainable<void>
      logInRealFromImg(): Chainable<void>
      logInRealFromButton(): Chainable<void>
    }
  }
}
