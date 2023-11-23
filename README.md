# Business Grants Portal Automation
This repository contains automated tests for the Business Grants Portal using Cypress.


## Prerequisites
Before running the tests, make sure you have the following installed:

* Node.js
* npm
## Installation

```bash
cd <repository-folder>
npm install
```

## Running Tests

To run tests locally, use the following commands:

### Run all tests and generate html report html

```bash
npm run test
```
Execute all tests in the terminal non-interactively.

### Open Cypress Test Runner:

```bash
npm run cy-open
```
This will open the Cypress Test Runner, where you can interactively run tests.

### Run Tests:

```bash
npm run cypress:run
```
Execute all tests in the terminal non-interactively without generating reports.


### Generate Mochawesome Report:

```bash
npm run cypress:report
```
This command will merge Cypress test reports and generate a comprehensive HTML report using Mochawesome at cypress/reports/report.html.


## Test Structure

The tests are organized as follows:

* **e2e Tests**: Located in the cypress/e2e folder, these tests cover various user stories and acceptance criterias.

* **Page Objects**: The cypress/pages folder contains page objects used to interact with different pages of the application.

* **Test Setup (e2e.js)**: The `e2e.js` file in the `cypress/support` directory serves as a global setup for end-to-end tests using Cypress. Its primary purpose is to configure global settings, load necessary modules, and handle common actions required before running the actual test scenarios. Below are the actions that are performed as part of this file 

    * **Base Configuration:** The file is processed and loaded automatically before any test files, allowing it to contain global configurations and behavior modifications for Cypress.

    * **Login Handling:** The `beforeEach` hook ensures that, before each test, the application is visited, and a user is signed in using credentials obtained from the 'credentials' fixture.

    * **Cy.origin Usage:** The `cy.origin` command is used to handle redirects and origin changes during the test. This is especially useful when dealing with authentication mechanisms like Amazon Cognito, where redirects are common.

    * **`beforeEach` Hook Used in e2e.js to ensures that common setup steps are executed across all end-to-end tests.**


* **Test Data**: The `fixtures/` directory contains various test data files used in different test scenarios. Each file is named according to the specific test or test suite it supports.


* **Reporting**: After running the tests, a Mochawesome HTML report is generated in the cypress/reports folder. You can view the report by opening cypress/report.html in a browser.

* **Screenshots**: Screenshots are automatically generated during test execution and can be found in the `cypress/screenshots` directory. To view a specific screenshot, navigate to the corresponding file and open it using an image viewer.

* **Config**: configs are maintained in configuration file (`cypress.config.json`). Key Configurations are as below
    * **projectId:** Unique identifier when connected to cypress cloud.
    * **viewportHeight and viewportWidth:** Set the default viewport dimensions.
    * **defaultCommandTimeout:** Set the default timeout for commands.
    * **reporter:** Use the Mochawesome reporter for test reports.
    * **reporterOptions:** Configure Mochawesome reporter options (e.g., report directory, file formats).


## Limitations: 
* **Handling Redirects :** As the base url redirects to Amazon Cognito Auth for login, (`cy.origin`) callbacks are used at most of the places to help in maintaining test flows across different origins, ensuring proper navigation and handling of redirects during the test scenarios.
* **Mochawesome Report Limitations:** The heavy use of cy.origin had an impact on the reports, as it can only capture commands and assertions within the current domain.
Page object code is not be fully represented in the reports due to multiple cy.origin invocations.
* **ES6 Import Challenges:** The use of cy.origin also posed challenges to use ES6 commands in tests and page objects. Due to the asynchronous nature of Cypress commands, importing and chaining commands using ES6 imports had an impact and Issues related to variable scoping and the asynchronous nature of commands had made difficult to use traditional ES6 imports effectively within the context of cy.origin.

## Alternative Solution:
* Following approach mentioned in cypress documentation at (` https://docs.cypress.io/guides/end-to-end-testing/amazon-cognito-authentication `) can help to reduce cy.origin usage but it may need more details like region, userPoolId,identityPoolId, userPoolWebClientId etc. from aws cognito auth to achieve. 
