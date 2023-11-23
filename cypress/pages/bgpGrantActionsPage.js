const { basePage } = require("./basePage");

export class bgpGrantActionsPage extends basePage {
    elements = {
        getNewGrantBtn: 'a#dashboard-menubox-app-apply-grant > section > div',
        selectITBtn: '#IT +div',
        selectGrantOptionBtn: 'input[id="International Expansion"] + div',
        selectMarketReadinessAssistance: 'input[id="Market Readiness Assistance 2"] +div',
        applyBtn: 'button#go-to-grant',
        proceedApplicationBtn: 'button.bgp-btn.bgp-btn-grantkeystart',
        processingTab: '.nav.nav-tabs a[href="#processing"]',
        tableProcessing: 'table#db-apps-processing'
    }

    clickGetNewGrant() {
        cy.contains("Apply for a grant to support your project");
        cy.get(this.elements.getNewGrantBtn).click();
    }

    selectSector() {
        cy.get(this.elements.selectITBtn).click();
    }

    selectGrant() {
        cy.contains("I need this grant to");
        cy.get(this.elements.selectGrantOptionBtn).click();
    }

    selectMarketReadinessAssistance() {
        cy.contains("What do you plan to do overseas with this grant?");
        cy.get(this.elements.selectMarketReadinessAssistance).click();
    }

    applyGrant() {
        cy.get(this.elements.applyBtn).click();
    }

    proceedApplication() {
        cy.get(this.elements.proceedApplicationBtn).click();
    }

    grantNewApplication() {
        this.clickGetNewGrant();
        this.selectSector();
        this.selectGrant();
        this.selectMarketReadinessAssistance();
        this.applyGrant();
        this.proceedApplication();
    }

    clickProcessingTab() {
        cy.get(this.elements.processingTab).click()

    }

    verifyProcessingApplicationAsSubmitted() {
        //TODO: Need to find workaround to extract local or env variables to get from asynchronous Cypress commands or cy.origin
        // or call this method inside async call back to use ref id

        //const refId = Cypress.env('refId');
        //cy.get(this.elements.tableProcessing).find('td').contains(refId).parent('tr').as('row');
        const refId = '2311'
        cy.get(this.elements.tableProcessing).find('td:contains("' + refId + '")').parent('tr').as('row');

        cy.get('@row').find('td').eq(0).should('contain.text', refId);
        cy.get('@row').find('td').eq(2).should('contain.text', 'Enterprise Singapore');
        cy.get('@row').find('td').eq(4).should('contain.text', 'Submitted');
    }

}

module.exports = new bgpGrantActionsPage();