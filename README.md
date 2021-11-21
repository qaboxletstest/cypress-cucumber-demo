# Cypress with Cucumber

This project is created to show how we can leverage Cucumber BDD framework in Cypress. Steps involved in configuring your project are following: -

### Assumption - cypress is already setup in your project.

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

If working on Typescript then
a) `npm install typescript tsify` if not already done.
b) add the following code in `cypress/plugins/index.ts`
```
  const cucumber = require("cypress-cucumber-preprocessor").default;
  const browserify = require("@cypress/browserify-preprocessor");

  module.exports = (on) => {
    const options = browserify.defaultOptions;

    options.browserifyOptions.plugin.unshift(['tsify']);
    // Or, if you need a custom tsconfig.json for your test files:
    // options.browserifyOptions.plugin.unshift(['tsify', {project: 'path/to/other/tsconfig.json'}]);

    on("file:preprocessor", cucumber(options));
  };
```

2.  What is covered here? - By no means this project is covering the complete Cucumber; rather it is only scratching the surface. So, topics covered are: -
    1. How to organize the tests?
      - Put all your feature files in cypress/integration/
      - Create one folder in cypress/integration/ for each feature file with the exact name of that feature file. Because the .feature file will use steps definitions from a directory with the same name as your .feature file. 
      - The javascript/typescript files containing the step definitions can have other names if you want to break them into different concerns.
    2. Example of Feature Files (Feature, Scenario, Given , When, Then, And)
    3. Example of Step Definition Files (Given , When, Then, And, Before, After)
    4. Usage of Cucumber Expression and Parameter types (int and string)
    5. Usage of Scenario Outline - Data table 
    6. Usage of Background Scenario
    7. Usage of Tags (with NOT, AND and OR) - Execute on basis of tags - Examples added in the `script object inside package.json file`.
    8. Usage of POM (also covered singleton pattern in JavaScript)

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
    3. Add the following code into `cypress/support/index.js` to attach screenshot of failed steps: -
       Taken this from [here](https://github.com/dane-harnett/cypress-cucumber-attach-screenshots-to-failed-steps)
      ```
        afterEach(() => {
            const screenshotsFolder = Cypress.config("screenshotsFolder");
            if (window.cucumberJson?.generate) {
                const testState = window.testState;
                const stepResult =
                    testState.runTests[testState.currentScenario.name][testState.currentStep];
                if (stepResult?.status === "failed") {
                    const screenshotFileName = `${testState.feature.name} -- ${testState.currentScenario.name} (failed).png`;
                    cy.readFile(
                        `${screenshotsFolder}/${Cypress.spec.name}/${screenshotFileName}`,
                        "base64"
                    ).then((imgData) => {
                        stepResult.attachment = {
                            data: imgData,
                            media: { type: "image/png" },
                            index: testState.currentStep,
                            testCase: testState.formatTestCase(testState.currentScenario),
                        };
                    });

                }
            }
        });
      ```

## Install Dependencies - in case you wanna use this as a sample project then download the ZIP file and first install all the project dependencies

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

Launches the Cypress test runner in the headless mode and generate cucumber html report.
