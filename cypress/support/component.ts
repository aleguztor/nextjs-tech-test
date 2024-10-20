import { mount } from "cypress/react18"
// import styles from "../../styles"
import "../../global.css"
import "./commands"
// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

declare global {
  namespace Cypress {
    interface Cypress {
      env(key: "EMAIL_GITHUB_TEST"): string
      env(key: "PASS_GITHUB_TEST"): string
    }
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add("mount", mount)

// Example use:
// cy.mount(styles)
