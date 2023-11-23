import { faker } from "@faker-js/faker";

class contactDetailsPage {
    elements = {
        name: 'input#react-contact_info-name',
        jobTitle: 'input#react-contact_info-designation',
        contactNo: 'input#react-contact_info-phone',
        email: 'input#react-contact_info-primary_email',
        alternateEmail: 'input#react-contact_info-secondary_email',
        addressAsCompanyProfile: 'input#react-contact_info-correspondence_address-copied',
        postalCode: 'input#react-contact_info-correspondence_address-postal',
        postalCodeSearchBtn: 'span#react-contact_info-correspondence_address-postal-postal',
        blockHouseNo: 'input#react-contact_info-correspondence_address-block',
        street: 'input#react-contact_info-correspondence_address-street',
        level: 'input#react-contact_info-correspondence_address-level',
        unit: 'input#react-contact_info-correspondence_address-unit',
        buildingName: 'input#react-contact_info-correspondence_address-building_name',
        loaAAsMainPerson: 'input#react-contact_info-copied',
        loaAAsMainPersonName: 'input#react-contact_info-offeree_name',
        loaAAsMainPersonJobTitle: 'input#react-contact_info-offeree_designation',
        loaAAsMainPersonEmail: 'input#react-contact_info-offeree_email',
        saveBtn: '#save-btn',
        nextBtn: '#next-btn'
    }

    clickContactDetailsSection() {
        cy.get('span').contains("Contact Details").click();
        cy.get('h2').should('have.text', 'Provide Your Contact Details');
    }

    verifyMainContactPersonFields() {
        cy.wrap(Object.entries(this.elements)).each(([key, value]) => {
            cy.get(value).should('exist');
        })
    }

    verifyLetterofOffereeFields() {
        //extract only letter of offeree fields from elements and verify exists
        const letterofOffereeFields = [this.elements.loaAAsMainPerson, this.elements.loaAAsMainPersonName, this.elements.loaAAsMainPersonJobTitle, this.elements.loaAAsMainPersonEmail]
        cy.wrap(Object.entries(letterofOffereeFields)).each(([key, value]) => {
            cy.get(value).should('exist');
        })
    }

    fillMainContactPersonDetails() {
        const mainPersonDetails = {
            "name": faker.string.alpha(5),
            "jobTitle": faker.string.alpha(5),
            "phone": faker.string.numeric({ length: { min: 8, max: 8 } }),
            "email": faker.internet.email(),
            "altEmail": faker.internet.email()
        }

        this.enterText(this.elements.name, mainPersonDetails.name);
        this.enterText(this.elements.jobTitle, mainPersonDetails.jobTitle);
        this.enterText(this.elements.contactNo, mainPersonDetails.phone);
        this.enterText(this.elements.email, mainPersonDetails.email);
        this.enterText(this.elements.alternateEmail, mainPersonDetails.altEmail);
        return mainPersonDetails
    }

    fillLetterOfOfferAddresseeDetails() {
        const data = {
            "name": faker.string.alpha(5),
            "jobTitle": faker.string.alpha(5),
            "email": faker.internet.email()
        }

        this.enterText(this.elements.loaAAsMainPersonName, data.name)
        this.enterText(this.elements.loaAAsMainPersonJobTitle, data.jobTitle)
        this.enterText(this.elements.loaAAsMainPersonEmail, data.email)
        return data
    }

    fillPostalCodeAndSearch() {
        cy.fixture('contact-details').then(contactDetails => {
            this.enterText(this.elements.postalCode, contactDetails.customPostalCode)
            cy.get(this.elements.postalCodeSearchBtn).click()
            this.save()
        })
    }

    verifyAutoPopulatedMailingAddressFromCompanyProfile() {
        cy.fixture('contact-details').then(contactDetails => {
            cy.get(this.elements.postalCode).invoke('val').should('eq', contactDetails.postalCode);
            cy.get(this.elements.blockHouseNo).invoke('val').should('eq', contactDetails.blockNo)
            cy.get(this.elements.street).invoke('val').should('eq', contactDetails.street)
            cy.get(this.elements.level).invoke('val').should('eq', contactDetails.level)
            cy.get(this.elements.unit).invoke('val').should('eq', contactDetails.unit)
        })

    }

    verifyAutoPopulatedMailingAddress() {
        //verify from external api one map
        cy.fixture('contact-details').then(contactDetails => {
            cy.request("https://developers.onemap.sg/commonapi/search?searchVal=" + contactDetails.customPostalCode + "&returnGeom=Y&getAddrDetails=Y&pageNum=1").as('results')

            cy.get('@results').should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.results[0].BLK_NO).to.eq(contactDetails.customBlockNo)
                expect(response.body.results[0].ROAD_NAME).to.eq(contactDetails.customStreet)
            })
        })
    }

    clickAddressAsCompanyProfile() {
        cy.get(this.elements.addressAsCompanyProfile).check()
        this.save()
    }

    clickLetterofOffereeMainPerson() {
        cy.get(this.elements.loaAAsMainPerson).check()
        this.save()
    }

    verifyAutoPopulatedLetterofOffereeAddressee(data) {
        cy.get(this.elements.loaAAsMainPersonName).invoke('val').should('eq', data.name)
        cy.get(this.elements.loaAAsMainPersonJobTitle).invoke('val').should('eq', data.jobTitle)
        cy.get(this.elements.loaAAsMainPersonEmail).invoke('val').should('eq', data.email)

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

    verifyDataSaved(personData, loaAData) {
        cy.get(this.elements.name).should('have.value', personData.name)
        cy.get(this.elements.jobTitle).should('have.value', personData.jobTitle)
        cy.get(this.elements.contactNo).should('have.value', personData.phone)
        cy.get(this.elements.email).should('have.value', personData.email)
        cy.get(this.elements.alternateEmail).should('have.value', personData.altEmail)
        this.verifyAutoPopulatedLetterofOffereeAddressee(loaAData)
        this.verifyAutoPopulatedMailingAddressFromCompanyProfile()
    }

}

module.exports = new contactDetailsPage();