const { defineConfig } = require("cypress");
const cucumberPreprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  video: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 5000,
  execTimeout: 60000,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  chromeWebSecurity: false,
  env: {
    codeCoverage: {
      exclude: ["cypress//.", "coverage//."],
    },
  },
  e2e: {
    async setupNodeEvents(on, config) {
      await cucumberPreprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
    baseUrl: "http://localhost:3000/",
    specPattern: "cypress/e2e/**/*.feature",
  },
});