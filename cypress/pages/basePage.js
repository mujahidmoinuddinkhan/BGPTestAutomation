export class basePage {

    /*constructor() {
        const baseUrl = 'https://qa-internet.bgp.onl'
        this.setupOrigin(baseUrl);
      }*/
    
      setupOrigin(baseUrl) {
        cy.origin(baseUrl, () => {
            cy.visit(baseUrl)
        });
      }
    

    enterText(element, text) {
        cy.get(element).should('be.visible').clear().type(text);
    }

    //Removed this function usage as most of the blocks are under cy.origin call backs
    waitForPageLoad() {
        
        // Wait for all requests to complete
        cy.intercept();
        cy.route('**').as('allRequests');

        // Wait for all requests to complete
        cy.wait('@allRequests');
 
    }

    getFormattedDate(date) {
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
        
        cy.log(`Generated Date: ${formattedDate}`);
        return formattedDate;
    }

}