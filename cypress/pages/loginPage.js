const { basePage } = require("./basePage");
const bgpHomePage = require("./bgpHomePage");

class loginPage extends basePage{
    elements ={
        //had to traverse css to get unique element
        username : () => cy.get('.panel-left-border > :nth-child(2) > :nth-child(1) > .cognito-asf > :nth-child(3) > #signInFormUsername'),
        password :  () => cy.get('.panel-left-border > :nth-child(2) > :nth-child(1) > .cognito-asf > :nth-child(5) > #signInFormPassword'),
        signInBtn : () => cy.get('.panel-left-border > :nth-child(2) > :nth-child(1) > .cognito-asf > .btn'),
    }

    enterUsername(username) {
        this.elements.username().type(username);
    }

    enterPassword(password) {
        this.elements.password().type(password);
    }

    async clickSignIn() {
        await this.elements.signInBtn().click();
    }
    
    signIn(username, password){
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickSignIn();
    }

}

module.exports = new loginPage();
