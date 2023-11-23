class bgpHomePage{
    elements ={
        applyForGrantText :   '.landing-box-login-header-9F3Tb',
        loginBtn : () => cy.get('#login-button > span'),
    }

    visit() {
        cy.visit('https://qa-internet.bgp.onl');
        return this;
    }
    
    verifyHomePage() {
        cy.get(this.elements.applyForGrantText).should('have.text', 'Apply for a grant now')
    }
    
    login() {
        this.verifyHomePage();
        this.elements.loginBtn().click();
    }
}
module.exports = new bgpHomePage();