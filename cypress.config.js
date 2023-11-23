const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'mnb1qb',
  e2e: {
    "experimentalOriginDependencies": true,
    //"experimentalSessionAndOrigin": true,
    "experimentalMemoryManagement": true,
    "numTestsKeptInMemory": 1,
    "viewportHeight": 768,
    "viewportWidth": 1366,
    "defaultCommandTimeout": 30000,
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "cypress/reports",
      "overwrite": false,
      "html": true,
      "json": true
    },
    //"testIsolation": false,
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
