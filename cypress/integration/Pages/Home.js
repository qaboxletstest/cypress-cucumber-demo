/* eslint-disable no-undef */
class Home {
    constructor() {
        if (Home._instance) {
            return Home._instance
        }
        Home._instance = this;
        this.header = "h1.App-header";
        this.logout = "button#logout";
        this.homeback = "button#home";
        this.todo = "li#todo>a"
    }

    get title() {
        return cy.get(this.header);
    }

    get logoutBtn() {
        return cy.get(this.logout);
    }

    get backToHomeBtn() {
        return cy.get(this.homeback);
    }

    get toDoLink() {
        return cy.get(this.todo);
    }
}

const homeObj = new Home()
export default homeObj