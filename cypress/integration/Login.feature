Feature: Login

    Login to the application

    Background: Login Page
        Given The Login Page is opened


    Scenario: Invalid credentials should allow user to login

        When Invalid Username and Password is entered
        And /login request is intercepted
        And Submit button is clicked
        Then /login request should give 401 Unauthorized status code

    @qabox
    Scenario: Valid credentials should allow user to login

        When Valid Username and Password is entered
        And /login request is intercepted
        And Submit button is clicked
        Then /login request should give 200 status code
        And Logout button should be enabled on the Home Page
