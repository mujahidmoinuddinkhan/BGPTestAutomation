const { basePage } = require("./basePage");

class eligibilityPage extends basePage{
    elements = {
        questions: 'label.control-label.bgp-label',
        q5SubQuestions: 'label.control-label.bgp-label > ul > li',
        yesRadioBtn: '.form-group > .controls > :nth-child(1) > .radiobutton',
        noRadioBtn: '.form-group > .controls > :nth-child(2) > .radiobutton',
        q1RadioYes: '#react-eligibility-sg_registered_check-true + span',
        q2RadioYes: '#react-eligibility-turnover_check-true + span',
        q3RadioYes: '#react-eligibility-global_hq_check-true + span',
        q4RadioYes: '#react-eligibility-new_target_market_check-true + span',
        q5RadioYes: '#react-eligibility-started_project_check-true + span',
        q1RadioNo: '#react-eligibility-sg_registered_check-false + span',
        q2RadioNo: '#react-eligibility-turnover_check-false + span',
        q3RadioNo: '#react-eligibility-global_hq_check-false + span',
        q4RadioNo: '#react-eligibility-new_target_market_check-false + span',
        q5RadioNo: '#react-eligibility-started_project_check-false + span',
        warningText: 'div.field-warning-text > span',
        faqLink: 'div.field-warning-text > span > a:first',
        saveBtn: '#save-btn',
        nextBtn: '#next-btn'
    }

    clickEligibilitySection() {
        cy.get('span').contains("Eligibility").click();
        cy.get('h2').should('have.text', 'Check Your Eligibility');
    }

    verifyEligibilityQuestions() {
        cy.get(this.elements.questions).should('have.length', 5)
        cy.get(this.elements.q5SubQuestions).should('have.length', 3)
        cy.fixture('eligibility').then(eligibilityData => {
            eligibilityData.questions.forEach(question => {
                cy.get(this.elements.questions).contains(question).should('be.visible');
            });
        });
    }

    verifyYesNoDisplayed() {
        cy.get(this.elements.yesRadioBtn).should('have.length', 5)
        cy.get(this.elements.noRadioBtn).should('have.length', 5)
    }

    selectAllYes() {
        cy.get(this.elements.yesRadioBtn).should('have.length', 5)
        //cy.get(this.elements.yesRadioBtn).should('be.visible').click({ multiple: true })
        cy.get(this.elements.q1RadioYes).should('be.visible').click()
        cy.get(this.elements.q2RadioYes).should('be.visible').click()
        cy.get(this.elements.q3RadioYes).should('be.visible').click()
        cy.get(this.elements.q4RadioYes).should('be.visible').click()
        cy.get(this.elements.q5RadioYes).should('be.visible').click()

    }

    selectAllNo() {
        cy.get(this.elements.noRadioBtn).should('have.length', 5)
        cy.get(this.elements.q1RadioNo).should('be.visible').click()
        cy.get(this.elements.q2RadioNo).should('be.visible').click()
        cy.get(this.elements.q3RadioNo).should('be.visible').click()
        cy.get(this.elements.q4RadioNo).should('be.visible').click()
        cy.get(this.elements.q5RadioNo).should('be.visible').click()
    }

    verifyWarningMessage() {
        cy.fixture('eligibility').then(eligibilityData => {
            cy.get(this.elements.warningText).should('have.length', 5).contains(eligibilityData.warningMessage).should('be.visible');
        })

    }

    clickFAQ() {
        cy.get(this.elements.faqLink)
            .invoke("attr", "target", "_self")
            .click();
    }

    verifyFAQ() {
        cy.fixture('eligibility').then(eligibilityData => {
                cy.url().should('eq', eligibilityData.faqUrl)
        })
    }

    save() {
        cy.get(this.elements.saveBtn).click();
    }

    verifyDataSaved() {
        cy.get(this.elements.yesRadioBtn)
            .each(($radio, index, $lis) => {
                cy.wrap($radio).parent()
                    .find('input')
                    .should('be.checked')
            })
    }

    next() {
        cy.get(this.elements.nextBtn).click();
    }

    fillAndClickNext(){
        this.selectAllYes();
        this.save();
        this.next();
    }

}

module.exports = new eligibilityPage();