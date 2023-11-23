
describe('User Story 1 – Eligibility Section', () => {

  const baseUrl = 'https://qa-internet.bgp.onl'

  beforeEach(() => {
    cy.origin(baseUrl, () => {
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.clickEligibilitySection();
    })
  })

  it('AC 1: should display all eligibility questions @ac1', () => {
    cy.origin(baseUrl, () => {
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.verifyEligibilityQuestions();
    });

  });
  it('AC 2: should allow answering questions with Yes or No', () => {
    cy.origin(baseUrl, () => {
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.verifyYesNoDisplayed();
      eligibilityPage.selectAllYes();
    });
  });

  it('AC 3: should display a warning message on selecting "No"', () => {
    cy.origin(baseUrl, () => {
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.selectAllNo();
      eligibilityPage.verifyWarningMessage();
    });
  });

  it('AC 4: should navigate to the FAQ page on clicking the link', () => {
    cy.origin(baseUrl, () => {
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.selectAllNo();
      eligibilityPage.save();
      eligibilityPage.clickFAQ();
    });
    cy.origin('https://www.gobusiness.gov.sg', () => {
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.verifyFAQ();
    });

  });


  it('AC 5: should save applicant inputs and reload saved values on refresh', () => {
    cy.origin(baseUrl, () => {
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.selectAllYes();
      eligibilityPage.save();
      cy.reload()
      eligibilityPage.verifyDataSaved();
    });
  });

});
