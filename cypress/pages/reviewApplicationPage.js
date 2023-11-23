const { faker } = require("@faker-js/faker");

export class reviewApplicationPage {
    elements = {
        declarationCheckBox: '#react-declaration-info_truthfulness_check',
        submitBtn: '#submit-btn',
        submitMessage: 'section>div.statusline.submitted + div > div > h3',
        submitStatus: '.key-status-section > tbody > tr > td:contains("Status:") + td.value',
        refId: '.key-status-section > tbody > tr > td:contains("Ref ID:") + td.value',
        agencyDetails: '.key-status-section > tbody > tr > td:contains("Agency Details:") + td > span',
        backToGrantActions: 'span.back-text',
        myGrantsBtn: '#sgds-nav-start'
    }

    checkDeclaration() {
        cy.get(this.elements.declarationCheckBox).check()
    }

    verifyFinalDeclaration() {
        cy.get(this.elements.declarationCheckBox).should('be.exist')
    }


    submit() {
        cy.get(this.elements.submitBtn).click();
    }


    verifyReviewReadOnlyPageDisplayed() {
        cy.get('h3').contains('Review Your Application');
        cy.get('h4.summaryaction').contains('Verify that the information provided is correct, then submit your grant.');
    }

    verifySaveDataOnReadOnlyPage(personData, loaAData, proposalData, businessImpactData, costData) {
        //verify company details
        cy.fixture('company-details').then(companyDetails => {
            this.verifyDataOnPage(Object.values(companyDetails));
        })

        // Verify contact details
        this.verifyDataOnPage(Object.values(personData));
        this.verifyDataOnPage(Object.values(loaAData));

        // Verify proposal details
        this.verifyDataOnPage(Object.values(proposalData));

        // Verify businessImpact details
        this.verifyDataOnPage(Object.values(businessImpactData));

        // Verify cost details
        //TODO while validating rental cost convert to currency format 1,000
        this.verifyDataOnPage(Object.values(costData));
    }

    verifyDataOnPage(dataValues) {
        dataValues.forEach((value) => {
            cy.contains(value).should('exist');
        });
    }

    verifySubmitSuccessfulMessage() {
        //TODO: Need to find workaround to extract local or env variables to get from asynchronous Cypress commands or cy.origin
        // or navigate to my grants and verify processing table ref id from here
        cy.get(this.elements.submitMessage).should('have.text', 'Your application has been submitted.')
        cy.get(this.elements.submitStatus).should('have.text', 'Submitted');
        this.verifyRefId();
        this.verifyAgencyDetails();
        
        const refId = Cypress.env('refId');
        cy.log(refId);
        /* return this.getRefId().then((refId) => {
            console.log('Ref ID:', refId);
            return refId;
        }); */
    }

    
    getRefId() {
        return this.getRefIdText().then((extractedRefId) => {
            cy.wrap(extractedRefId).should('not.be.empty');
            return extractedRefId;
        });
    }

    getRefIdText() {
        return cy.get(this.elements.refId)
            .invoke('text')
            .then((text) => text.trim());
    }


    verifyRefId() {
        cy.get(this.elements.refId).invoke('text').then((text) => {
            const isAlphanumericCapital = /^[A-Z0-9]+$/.test(text);
            expect(isAlphanumericCapital).to.be.true;
            cy.log(text)
            Cypress.env('refId', text);
        });
    }

    verifyAgencyDetails() {
        cy.get(this.elements.agencyDetails).invoke('text').then((text) => {
            expect(text).to.contain('Enterprise Singapore')
        });
    }

    clickMyGrants() {
        cy.get(this.elements.myGrantsBtn).click()
    }
}

module.exports = new reviewApplicationPage();
