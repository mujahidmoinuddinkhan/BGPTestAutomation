const { faker } = require("@faker-js/faker");
const { basePage } = require("./basePage");

export class businessImpactPage extends basePage {
    elements = {
        fyEndDate: '#react-project_impact-fy_end_date_0',
        overseasSales0: '#react-project_impact-overseas_sales_0',
        overseasSales1: '#react-project_impact-overseas_sales_1',
        overseasSales2: '#react-project_impact-overseas_sales_2',
        overseasSales3: '#react-project_impact-overseas_sales_3',
        overseasInvestments0: '#react-project_impact-overseas_investments_0',
        overseasInvestments1: '#react-project_impact-overseas_investments_1',
        overseasInvestments2: '#react-project_impact-overseas_investments_2',
        overseasInvestments3: '#react-project_impact-overseas_investments_3',
        rationalForProjects: '#react-project_impact-rationale_remarks',
        nonTangiblebenefits: '#react-project_impact-benefits_remarks',
        saveBtn: '#save-btn',
        nextBtn: '#next-btn'
    }

    clickBusinessImpactSection() {
        cy.get('span').contains("Business Impact").click();
        cy.get('h2').should('have.text', 'Explain The Business Impact');
    }

    fillData() {
        const businessImpactData = {
            "fyEndDate": this.getFormattedDate(faker.date.soon({ days: 1 })),
            "description": faker.lorem.sentence(),
            "number": faker.number.float({ min: 1, max: 10, precision: 0.1 })
        }

        this.enterText(this.elements.fyEndDate, businessImpactData.fyEndDate)

        this.enterText(this.elements.overseasSales0, businessImpactData.number)
        this.enterText(this.elements.overseasSales1, businessImpactData.number)
        this.enterText(this.elements.overseasSales2, businessImpactData.number)
        this.enterText(this.elements.overseasSales3, businessImpactData.number)
        this.enterText(this.elements.overseasInvestments0, businessImpactData.number)
        this.enterText(this.elements.overseasInvestments1, businessImpactData.number)
        this.enterText(this.elements.overseasInvestments2, businessImpactData.number)
        this.enterText(this.elements.overseasInvestments3, businessImpactData.number)

        this.enterText(this.elements.rationalForProjects, businessImpactData.description)
        this.enterText(this.elements.nonTangiblebenefits, businessImpactData.description)

        return businessImpactData
    }

    enterText(element, text) {
        cy.get(element).clear();
        cy.get(element).should('be.visible').type(text);
    }

    save() {
        cy.get(this.elements.saveBtn).click();
    }

    next() {
        cy.get(this.elements.nextBtn).click();
    }

}

module.exports = new businessImpactPage();