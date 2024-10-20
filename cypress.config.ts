import { defineConfig } from "cypress"
import { GitHubSocialLogin } from "cypress-social-logins/src/Plugins"

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    env: {
      SITE_NAME: process.env.NEXTAUTH_URL,
      EMAIL_GITHUB_TEST: process.env.EMAIL_GITHUB_TEST,
      PASS_GITHUB_TEST: process.env.PASS_GITHUB_TEST,
    },
    setupNodeEvents(on, config) {
      on("task", {
        GitHubSocialLogin,
      })
    },
    supportFile: "cypress/support/index.ts",
  },
})
