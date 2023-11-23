const { faker } = require("@faker-js/faker");
const { basePage } = require("./basePage");

export class proposalPage  extends basePage{
    elements = {
        title: 'input#react-project-title',
        startDate: 'input#react-project-start_date',
        endDate: 'input#react-project-end_date',
        description: 'textarea#react-project-description',
        activity: 'span#react-select-project-activity--value',
        activityItem: 'div#react-select-project-activity--list.Select-menu > div.Select-option-group:nth-child(1) > div#react-select-project-activity--option-0',
        targetMarket: 'span#react-select-project-primary_market--value',
        targetMarketItem: 'div#react-select-project-primary_market--option-0',
        yesNoRadio: 'label.bgp-radio:nth-child(1) > span.radiobutton',
        saveBtn: '#save-btn',
        nextBtn: '#next-btn'
    }

    clickProposalSection() {
        cy.get('span').contains("Proposal").click();
        cy.get('h2').should('have.text', 'Submit Your Proposal');
    }

    fillData(){
        const proposalData = {
            "title": faker.string.alpha(5),
            "startDate": this.getFormattedDate(faker.date.soon({days : 1})),
            "endDate": this.getEndDate(),
            "description": faker.lorem.sentence()
        }

        this.enterText(this.elements.title, proposalData.title)
        this.enterText(this.elements.startDate,  proposalData.startDate)
        this.enterText(this.elements.endDate,  proposalData.endDate)
        this.enterText(this.elements.description,  proposalData.description)

        cy.get(this.elements.activity).click();
        cy.get(this.elements.activityItem).click();

        cy.get(this.elements.targetMarket).click();
        cy.get(this.elements.targetMarketItem).click();

        cy.get(this.elements.yesNoRadio).click();

        return  proposalData
    }

    getEndDate() {
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setMonth(currentDate.getMonth() + 11);
        const endDate = this.getFormattedDate(futureDate);
        return endDate;
    }

    enterText(element, text) {
        cy.get(element).should('be.visible').clear().type(text);
    }

    save() {
        cy.get(this.elements.saveBtn).click();
    }

    next() {
        cy.get(this.elements.nextBtn).click();
    }

}

module.exports = new proposalPage();