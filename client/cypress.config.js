import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "guat3k",
  "viewportWidth": 1920,
  "viewportHeight": 1080,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
