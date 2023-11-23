describe('User Story 2 – Contact Details Section', () => {

  const baseUrl = 'https://qa-internet.bgp.onl'
  beforeEach(() => {
    cy.origin(baseUrl, () => {
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      contactDetailsPage.clickContactDetailsSection()
    })
  })

  it('AC1: should contain inputs for Main Contact Person and Letter of Offeree', () => {
    cy.origin(baseUrl, () => {
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      contactDetailsPage.verifyMainContactPersonFields();
    });
  });

  it('AC2: should auto-populate Mailing Address using external API', () => {
    cy.origin(baseUrl, () => {
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      contactDetailsPage.fillPostalCodeAndSearch();
      contactDetailsPage.verifyAutoPopulatedMailingAddress();
    });
  });

  it('AC3: should auto-populate Mailing Address from Company Profile', () => {
    cy.origin(baseUrl, () => {
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      contactDetailsPage.clickAddressAsCompanyProfile();
      contactDetailsPage.verifyAutoPopulatedMailingAddressFromCompanyProfile();
    });
  });

  it('AC4: should contain inputs for Letter of Offeree', () => {
    cy.origin(baseUrl, () => {
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      contactDetailsPage.verifyLetterofOffereeFields();
    });
  });

  it('AC5: should populate Letter of Offeree from Main Contact Person', () => {
    cy.origin(baseUrl, () => {
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      const data = contactDetailsPage.fillMainContactPersonDetails();
      contactDetailsPage.clickLetterofOffereeMainPerson();
      contactDetailsPage.verifyAutoPopulatedLetterofOffereeAddressee(data);
    });
  });

  it('AC6: should save applicant inputs and reload saved values on refresh', () => {
    cy.origin(baseUrl, () => {
      const contactDetailsPage = Cypress.require("../pages/contactDetailsPage")
      const personData = contactDetailsPage.fillMainContactPersonDetails();
      contactDetailsPage.clickAddressAsCompanyProfile();
      const loaAData = contactDetailsPage.fillLetterOfOfferAddresseeDetails();
      contactDetailsPage.save();
      cy.reload()
      contactDetailsPage.verifyDataSaved(personData, loaAData);
    });
  });


  it.skip('should throw error for invalid postcode search and address details should not be auto populated', () => {

  });

});
