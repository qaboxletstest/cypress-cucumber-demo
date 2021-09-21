/* eslint-disable no-undef */
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import homeObj from "../Pages/Home"

Given("User is logged into the application", () => {
    cy.loginViaAPISession(Cypress.env("username"), Cypress.env("password"))
})

When("navigated to Home Page", () => {
    cy.visit("/home")
})

Then("header h1 must contain {string}", (headerText) => {
    homeObj.title.then($el => {
        expect($el.text().trim()).to.eq(headerText);
    })
})

Then("Logout Button is enabled", () => {
    homeObj.logoutBtn.should("be.enabled")
})

Then("Go To Home Button is enabled", () => {
    homeObj.backToHomeBtn.should("be.enabled")
})

And("user clicks ToDo List hyperlink", () => {
    homeObj.toDoLink.click()
})

Then("new page url must contain {string}", (urlPath) => {
    cy.url().should("contain", urlPath)
})