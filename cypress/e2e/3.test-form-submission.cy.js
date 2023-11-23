describe('User Story 3 (EPIC) – Form Submission', () => {
  const baseUrl = 'https://qa-internet.bgp.onl'

  //Multiple AC's are combined into 1 test case to reduce redundant test executions

  it(`AC1: should be taken to a read-only summary page Upon filling all form sections and clicking the Review button
      AC3: should contain all previously filled details on the read-only summary page
      AC4: should show a final Consent and Acknowledgement checkbox at the bottom of the read-only summary page.`, () => {
    cy.origin(baseUrl, () => {
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.clickEligibilitySection();
      eligibilityPage.selectAllYes();
      eligibilityPage.save();
      eligibilityPage.next();
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      const personData = contactDetailsPage.fillMainContactPersonDetails();
      contactDetailsPage.clickAddressAsCompanyProfile();
      const loaAData = contactDetailsPage.fillLetterOfOfferAddresseeDetails();
      contactDetailsPage.save();
      contactDetailsPage.next();
      const proposalPage = Cypress.require("../pages/proposalPage")
      proposalPage.clickProposalSection()
      const proposalData = proposalPage.fillData();
      proposalPage.save();
      proposalPage.next();
      const businessImpactPage = Cypress.require("../pages/businessImpactPage")
      businessImpactPage.clickBusinessImpactSection()
      const businessImpactData = businessImpactPage.fillData();
      businessImpactPage.save();
      businessImpactPage.next();
      const costPage = Cypress.require("../pages/costPage")
      costPage.clickCostSection()
      const costData = costPage.fillData();
      costPage.save();
      costPage.next();
      const declareAndReviewPage = Cypress.require("../pages/declareAndReviewPage")
      declareAndReviewPage.clickdeclareAndReviewSection()
      declareAndReviewPage.selectAllNo()
      declareAndReviewPage.checkDeclaration()
      declareAndReviewPage.save()
      declareAndReviewPage.review()
      const reviewApplicationPage = Cypress.require("../pages/reviewApplicationPage")
      //AC1
      reviewApplicationPage.verifyReviewReadOnlyPageDisplayed()
      //AC3
      reviewApplicationPage.verifySaveDataOnReadOnlyPage(personData, loaAData, proposalData, businessImpactData, costData)
      //AC4
      reviewApplicationPage.verifyFinalDeclaration()
    })
  });

  it('AC2: should trigger validation errors for missing inputs error and number should be shown in the sidebar', () => {
    cy.origin(baseUrl, () => {

      const declareAndReviewPage = Cypress.require("../pages/declareAndReviewPage")
      declareAndReviewPage.clickdeclareAndReviewSection()
      declareAndReviewPage.review()
      declareAndReviewPage.verifyErrorsOnSidebar()
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.clickEligibilitySection();
      declareAndReviewPage.verifyPageInputErrors()
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      contactDetailsPage.clickContactDetailsSection();
      declareAndReviewPage.verifyPageInputErrors()
      const proposalPage = Cypress.require("../pages/proposalPage")
      proposalPage.clickProposalSection()
      declareAndReviewPage.verifyPageInputErrors()
      const businessImpactPage = Cypress.require("../pages/businessImpactPage")
      businessImpactPage.clickBusinessImpactSection()
      declareAndReviewPage.verifyPageInputErrors()
      const costPage = Cypress.require("../pages/costPage")
      costPage.clickCostSection()
      costPage.verifyPageInputErrors()
      declareAndReviewPage.clickdeclareAndReviewSection()
      declareAndReviewPage.verifyPageInputErrors()

    })
  });

  it(`AC5: should allow submission and display a success message and contain an Application Ref ID and Agency details as Enterprise Singapore 
      AC6: The main My Grants dashboard should show the application under the Processing tab on the dashboard after submission`, () => {
    cy.origin(baseUrl, () => {
      const eligibilityPage = Cypress.require("../pages/eligibilityPage");
      eligibilityPage.clickEligibilitySection();
      eligibilityPage.selectAllYes();
      eligibilityPage.save();
      eligibilityPage.next();
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      const personData = contactDetailsPage.fillMainContactPersonDetails();
      contactDetailsPage.clickAddressAsCompanyProfile();
      const loaAData = contactDetailsPage.fillLetterOfOfferAddresseeDetails();
      contactDetailsPage.save();
      contactDetailsPage.next();
      const proposalPage = Cypress.require("../pages/proposalPage")
      proposalPage.clickProposalSection()
      const proposalData = proposalPage.fillData();
      proposalPage.save();
      proposalPage.next();
      const businessImpactPage = Cypress.require("../pages/businessImpactPage")
      businessImpactPage.clickBusinessImpactSection()
      const businessImpactData = businessImpactPage.fillData();
      businessImpactPage.save();
      businessImpactPage.next();
      const costPage = Cypress.require("../pages/costPage")
      costPage.clickCostSection()
      const costData = costPage.fillData();
      costPage.save();
      costPage.next();
      const declareAndReviewPage = Cypress.require("../pages/declareAndReviewPage")
      declareAndReviewPage.clickdeclareAndReviewSection()
      declareAndReviewPage.selectAllNo()
      declareAndReviewPage.checkDeclaration()
      declareAndReviewPage.save()
      declareAndReviewPage.review()
      const reviewApplicationPage = Cypress.require("../pages/reviewApplicationPage")
      reviewApplicationPage.checkDeclaration()
      reviewApplicationPage.submit()
      reviewApplicationPage.verifySubmitSuccessfulMessage()
      reviewApplicationPage.clickMyGrants()
      const bgpGrantActionsPage = Cypress.require("../pages/bgpGrantActionsPage");
      bgpGrantActionsPage.clickProcessingTab();
      bgpGrantActionsPage.verifyProcessingApplicationAsSubmitted();
    })

  });

});