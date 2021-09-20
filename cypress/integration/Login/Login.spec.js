/* eslint-disable no-undef */
import { Given, When, Then, And, Before, After } from "cypress-cucumber-preprocessor/steps"
import loginObj from "../Pages/Login"
import homeObj from "../Pages/Home"

// Before(() => {
//     cy.log("Login Tests - Started")
// });

// After(() => {
//     cy.log("Login Tests - Finished")
// });

Given("The Login Page is opened", () => {
    cy.visit("/")
})

When("Invalid Username and Password is entered", () => {
    loginObj.uname.type("123")
    loginObj.pwd.type("123")
})

And("/login request is intercepted", () => {
    cy.intercept({
        method: "POST",
        path: "/login",
    }).as("login")
})

And("Submit button is clicked", () => {
    loginObj.submitBtn.click()
})

Then(/^login request should give {string} Unauthorized status code$/, (_statusCode) => {
    cy.wait("@login").then(res => {
        expect(res.response.statusCode).to.eq(parseInt(_statusCode))
    })
})

// When("Valid Username and Password is entered", () => {
//     loginObj.uname.type("adminS3rcet")
//     loginObj.pwd.type("adminS3rcet")
// })



// Then("/login request should give {int} status code", (_statusCode) => {
//     cy.wait("@login").then(res => {
//         expect(res.response.statusCode).to.eq(_statusCode)
//     })
// })

// And("Logout button should be enabled on the Home Page", () => {
//     cy.url().should("contain", "/home")
//     homeObj.logoutBtn.should("be.enabled")
// })