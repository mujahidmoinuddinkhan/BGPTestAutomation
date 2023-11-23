class corpPassManualLoginPage {

    elements ={
        entityId : () => cy.get('#entityId'),
        userId : () => cy.get('#userId'),
        userRole : () => cy.get('#userRole'),
        userFullName : () => cy.get('#userFullName'),
        loginBtn : () => cy.get('form > .btn'),
    }

    login(data) {
        this.elements.entityId().type(data.entityId);
        this.elements.userId().type(data.userId);
        this.elements.userRole().type(data.userRole)
        this.elements.userFullName().type(data.userFullName)
        this.elements.loginBtn().click()
    }
}
module.exports = new corpPassManualLoginPage();