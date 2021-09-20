/* eslint-disable no-undef */
class Login {
    constructor() {
        if (Login._instance) {
            return Login._instance
        }
        Login._instance = this;
        this.username = "input#username";
        this.password = "input#password";
        this.submit = "button#submit"
    }

    get uname() {
        return cy.get(this.username);
    }

    get pwd() {
        return cy.get(this.password);
    }

    get submitBtn() {
        return cy.get(this.submit);
    }
}

const loginObj = new Login()
export default loginObj