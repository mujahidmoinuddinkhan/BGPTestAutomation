const { faker } = require("@faker-js/faker");

class costPage {
    elements = {
        officeSpaceRentalSectiion: 'div#react-project_cost-office_rentals-accordion-header',
        addItemBtn: 'button#react-project_cost-office_rentals-add-item',
        description: 'textarea#react-project_cost-office_rentals-0-description',
        rentalDuration: 'input#react-project_cost-office_rentals-0-rental_duration',
        montlyRental: 'input#react-project_cost-office_rentals-0-amount_in_billing_currency',
        inputFieldError: 'div.text-semibold.danger-helptext',
        fileUpload: '#react-project_cost-office_rentals-0-attachments-input',
        saveBtn: '#save-btn',
        nextBtn: '#next-btn'
    }

    clickCostSection() {
        cy.get('span').contains("Cost").click();
        cy.get('h2').should('have.text', 'Provide Details of Costs');
    }

    clickAddItemInOfficeSpaceRentalSection() {
        cy.get(this.elements.officeSpaceRentalSectiion).should('be.visible').click({ force: true })
        cy.get(this.elements.addItemBtn).should('be.visible').click()
    }

    fillData() {
        //TODO: Store rental in currency format or read it as int and convert to currency 
        const costData = {
            "description": faker.lorem.sentence(),
            "rentalDuration": faker.number.int({ min: 1, max: 10 })
            //"montlyRental": faker.number.int({min:1, max: 10000 })
        }
        this.clickAddItemInOfficeSpaceRentalSection();

        this.enterText(this.elements.description, costData.description)
        this.enterText(this.elements.rentalDuration, costData.rentalDuration)
        //this.enterText(this.elements.montlyRental, costData.montlyRental)
        this.enterText(this.elements.montlyRental, faker.number.int({ min: 1, max: 10000 }))
        this.uploadRentalFile();
        return costData
    }

    async enterText(element, text) {
        await cy.get(element).should('be.visible').clear().type(text);//.should('have.text', text);
    }

    save() {
        cy.get(this.elements.saveBtn).click();
    }

    next() {
        cy.get(this.elements.nextBtn).click();
    }

    verifyPageInputErrors() {
        cy.get(this.elements.inputFieldError).should('have.length', 1);
    }

    uploadRentalFile() {
        require('../support/commands')
        assert(cy.attachFile, 'attachFile command is available')
        cy.get(this.elements.fileUpload).attachFile('rental.png');
        cy.contains('rental.png');
    }

    dragAndDropFile() {
        //div[@text()='Drag and drop files here']
        cy.fixture('file_to_upload.txt')
            .then(fileContent => {
                dragAndDropArea
                    .trigger('dragenter', {
                        dataTransfer: { files: [] }
                    });
                dragAndDropArea.trigger('dragover', {
                    dataTransfer: { files: [] }
                });
                dragAndDropArea.trigger('drop', {
                    dataTransfer: { files: [fileContent] }
                });
            });
    }

}

module.exports = new costPage();