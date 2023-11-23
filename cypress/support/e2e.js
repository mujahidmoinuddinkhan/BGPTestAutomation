// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'


// Alternatively you can use CommonJS syntax:
// require('./commands')
//using this because of using inside cy.origin
const loginPage = require("../pages/loginPage");

beforeEach(() => {
    cy.fixture('credentials').then(async (data) => {
        cy.visit(data.baseUrl, { failOnStatusCode: false });
        loginPage.signIn(data.username, data.password)
        cy.origin(data.baseUrl, { args: data }, (data) => {
            const bgpHomePage = Cypress.require("../pages/bgpHomePage");
            bgpHomePage.visit().login();
            const corpPassManualLoginPage = Cypress.require("../pages/corpPassManualLoginPage");
            corpPassManualLoginPage.login(data);
            const bgpGrantActionsPage = Cypress.require("../pages/bgpGrantActionsPage");
            bgpGrantActionsPage.grantNewApplication();
        });
    });
});
