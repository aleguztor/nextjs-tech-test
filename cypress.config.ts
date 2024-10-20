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
      GITHUB_USER: "kihacaoficial@gmail.com",
      GITHUB_PW: "aleelcabron12",
      COOKIE_NAME: "next-auth.session-token",
      SITE_NAME: "http://localhost:3000",
    },
    setupNodeEvents(on, config) {
      on("task", {
        GitHubSocialLogin,
      })
    },
    supportFile: false,
  },
})
