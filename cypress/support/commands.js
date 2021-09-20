/* eslint-disable no-undef */
Cypress.Commands.add("loginViaUI", (username, password) => {
    cy.visit("/")
    cy.get("input#username").type(username)
    cy.get("input#password").type(password)
    cy.get("button#submit").click()
})

Cypress.Commands.add("loginViaAPI", (uname, pwd) => {
    cy.request({
        method: "POST",
        url: Cypress.env("apiserver") + "/login",
        body: {
            username: uname,
            password: pwd
        }
    }).then(res => {
        expect(res.status).to.eq(200)
        window.localStorage.setItem("token", JSON.stringify(res.body))
    })
})

Cypress.Commands.add("loginViaUISession", (username, password) => {
    cy.session([username, password], () => {
        cy.visit("/")
        cy.get("input#username").type(username)
        cy.get("input#password").type(password)
        cy.get("button#submit").click()
        cy.get("#logout").should("be.enabled")
    },
        {
            validate() {
                cy.visit("/home")
                cy.get("#home").should("be.enabled")
            }
        }
    )
})

Cypress.Commands.add("loginViaAPISession", (uname, pwd) => {
    cy.session([uname, pwd], () => {
        cy.request({
            method: "POST",
            url: Cypress.env("apiserver") + "/login",
            body: {
                username: uname,
                password: pwd
            }
        }).then(res => {
            expect(res.status).to.eq(200)
            window.localStorage.setItem("token", JSON.stringify(res.body))
        })
    },
        {
            validate() {
                cy.visit("/home")
                cy.get("#home").should("be.enabled")
            }
        }
    )

})