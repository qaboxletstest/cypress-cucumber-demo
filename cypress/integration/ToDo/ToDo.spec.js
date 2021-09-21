/* eslint-disable no-undef */
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import toDoObj from "../Pages/ToDo"

Given("User is logged into the application", () => {
    cy.loginViaAPISession(Cypress.env("username"), Cypress.env("password"))
})

When("navigated to ToDo Page", () => {
    cy.visit("/todo")
})

And("User enters following Tasks And User Clicks on Submit Button", (datatable) => {
    datatable.hashes().forEach(row => {
        toDoObj.inputToDo.type(row.Task)
        toDoObj.submitBtn.click()
    })
})

Then("Following New todos should be created", (datatable) => {
    datatable.hashes().forEach(row => {
        toDoObj.findToDo(row.Task).should("exist")
    })
})

And("User selects a Task and Clicks on X Button", (datatable) => {
    datatable.hashes().forEach(row => {
        toDoObj.deleteToDo(row.Task)
    })
})

Then("Following todo should be deleted", (datatable) => {
    datatable.hashes().forEach(row => {
        toDoObj.findToDo(row.Task).should("not.exist")
    })
})