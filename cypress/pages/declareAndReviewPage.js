const { faker } = require("@faker-js/faker");

class declareAndReviewPage {
    elements = {
        noRadioBtn: 'label.bgp-radio:nth-child(1) > span.radiobutton:nth-child(2)',
        declarationCheckBox: 'input#react-declaration-consent_acknowledgement_check',
        sidebarErrors: 'span.label.label-error',
        inputFieldErrors: 'p.help-inline.field-error-message',
        saveBtn: '#save-btn',
        reviewBtn: '#review-btn'
    }

    clickdeclareAndReviewSection() {
        cy.get('span').contains("Declare & Review").click();
        cy.get('h2').should('have.text', 'Declare & Acknowledge Terms');
    }

    checkDeclaration() {
        cy.get(this.elements.declarationCheckBox).check()
    }

    selectAllNo() {
        cy.get(this.elements.noRadioBtn).should('have.length', 8)
        cy.get(this.elements.noRadioBtn).should('be.visible').click({ multiple: true })
    }

    save() {
        cy.get(this.elements.saveBtn).click();
    }

    review() {
        cy.get(this.elements.reviewBtn).click();
    }

    verifyErrorsOnSidebar() {
        //verify all 6 forms shows error on sidebar
        cy.get(this.elements.sidebarErrors).should('have.length', 6)
    }
    verifyPageInputErrors() {
        cy.get(this.elements.inputFieldErrors).should('have.length.gt', 1);
    }

}

module.exports = new declareAndReviewPage();