import { defineConfig } from "cypress"

export default defineConfig({
  env: {
    API_URL: process.env.API_URL || "https://default.api.com",
  },
  // Otras configuraciones de Cypress aquí
})
