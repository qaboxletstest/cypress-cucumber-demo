
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