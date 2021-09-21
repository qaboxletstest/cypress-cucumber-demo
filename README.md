# Cypress with Cucumber

This project is created to show how we can leverage Cucumber BDD framework in Cypress. Steps involved in configuring your project are following: -

1. Add cypress-cucumber-preprocessor Plugin `npm install --save-dev cypress-cucumber-preprocessor` to Run cucumber/gherkin-syntaxed specs with cypress.io.

To `cypress/plugins/index.js` add

```
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}
```

Add support for feature files to your Cypress configuration by add the following in `cypress.json`

```
"testFiles": "**/*.feature"
```

Configure the plugin to use the Cypress Cucumber Preprocessor Style pattern for placing step definitions files by adding the following in `package.json`

```
"cypress-cucumber-preprocessor": {
  "nonGlobalStepDefinitions": true
}
```


2.  What is covered here? - By no means this project is covering the complete Cucumber; rather it is only scratching the surface. So, topics covered are: -
    1. How to organize the tests?
      - Put all your feature files in cypress/integration/
      - Create one folder in cypress/integration/ for each feature file with the exact name of that feature file. Because the .feature file will use steps definitions from a directory with the same name as your .feature file. 
      - The javascript/typescript files containing the step definitions can have other names if you want to break them into different concerns.
    2. Example of Feature Files (Feature, Scenario, Given , When, Then, And)
    3. Example of Step Definition Files (Given , When, Then, And, Before, After)
    4. Usage of Cucumber Expression and Parameter types (int and string)
    5. Usage of Data table 
    6. Usage of Background Scenario
    7. Usage of Tags (with NOT, AND and OR) - Execute on basis of tags - Examples added in the `script object inside package.json file`.
    8. Usage of POM

3. Generate Cucumber HTML report and attach screenshot of failed steps
    1. cypress-cucumber-preprocessor Plugin generates a cucumber.json file as an output. This output file contains the result of all our feature file execution. And using this JSON file only we are going to generate an HTML report. So, to make the cucumber plugin generate a JSON file output, we need to make some changes to our cypress cucumber properties. 
    Since we already have cypress-cucumber-preprocessor plugin in our package.json as mentioned below.
    ```
    "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true
    }
    ```
    So we modify it to generate JSON-
    ```
    "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true,
    "cucumberJson": {
      "generate": true,
      "outputFolder": "cypress/reports/cucumber-json",
      "filePrefix": "",
      "fileSuffix": ".cucumber"
      }
    }
    ```
    2. Add cucumber-html-reporter Plugin for converting the JSON output to HTML report `npm i --save-dev cucumber-html-reporter`. After installation we need to have a .js file that can read your .json file and create an HTML report from it. So, let's create `cucumber-html-report.js` file at the root of your project and add the following code into it: -
    ```
      const report = require("multiple-cucumber-html-reporter");
      report.generate({
          jsonDir: "cypress/reports/cucumber-json",  // ** Path of .json file **//
          reportPath: "cypress/reports", // ** Path of .html file **//
          metadata: {
              browser: {
                  name: "chrome",
                  version: "92",
              },
              device: "Local test machine",
              platform: {
                  name: "windows",
                  version: "10",
              },
          },
});
    ```

## Install Dependencies

`npm install`

## Available Scripts

In the project directory, you can run:

### Start Express Server `npm run start-server`

Open [http://localhost:8080/login](http://localhost:8080/login) to view it in the browser.
```
username=adminS3rcet
password=adminS3rcet
```

### Start React UI App `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
```
username=adminS3rcet
password=adminS3rcet
```

### `npm test`

Launches the Cypress test runner in the interactive watch mode.
```
    Tests using both API and UI - Both old and new way

    beforeEach(() => {
        // PLACE YOUR SESSION COMMAND IN HERE FIRST

        // EXAMPLE
        // cy.loginViaUISession(Cypress.env("username"), Cypress.env("password"))
        // OR
        // cy.loginViaAPISession(Cypress.env("username"), Cypress.env("password"))

        // VISIT THE PAGE AFTER SESSION COMMAND

        // EXAMPLE
        // cy.visit("/")
    })


    it('Login via Custom LOGIN-UI Command', () => {
        cy.loginViaUI(Cypress.env("username"), Cypress.env("password"))
        // cy.loginViaUISession(Cypress.env("username"), Cypress.env("password"))
        cy.visit("/")
        cy.url().should("contain", "/home")
        cy.get("#logout").should("be.enabled")
    });

    it('Login via Custom LOGIN-API Command - Greet', () => {
        cy.loginViaAPI(Cypress.env("username"), Cypress.env("password"))
        // cy.loginViaAPISession(Cypress.env("username"), Cypress.env("password"))
        cy.visit("/greet")
        cy.get("h2.title").should("have.text", "Welcome To QA BOX LET'S TEST")
    });
```

```

Cypress Custom Login Commands via both API and UI - Both old and new way

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

```

### `cy.session`
Cache and restore cookies, localStorage, and sessionStorage in order to reduce test setup times. The session API is currently experimental, and can be enabled by setting the experimentalSessionSupport flag to true in the Cypress config or by using Cypress.config() at the top of a spec file.

```
cy.session(id, setup, options)

```
1. id (String, Array, Object) - A unique identifier that will be used to cache and restore a given session. In simple cases, a String value is sufficient. In order to simplify generation of more complex ids, if you pass an Array or Object, Cypress will generate an id for you by deterministically stringifying the value you pass in.

2. setup (Function) - This function is called whenever a session for the given id hasn't yet been cached, or if it's no longer valid (see the validate option). After setup runs, Cypress will preserve all cookies, sessionStorage, and localStorage, so that subsequent calls to cy.session() with the same id will bypass setup and just restore the cached session data.

3. options (Object) - log and validate

validate - Validates the newly-created or restored session.

The validate function is run immediately after the setup function runs, and also every time cy.session() restores a cached session. If the validate function returns false, throws an exception, returns a Promise that resolves to false or rejects, or contains any failing Cypress command, the session will be considered invalid, and setup will be re-run. If validation fails immediately after setup runs, the test will fail.

