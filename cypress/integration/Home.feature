Feature: Validate Home Page

    Validate the elements on Home Page and check all possible navigations from Home Page

    Background: Login and Navigate to Home Page
        Given User is logged into the application
        When navigated to Home Page

    Scenario: Check header h1 contains QA BOX LET'S TEST
        Then header h1 must contain "HEY - QA BOX LET'S TEST"

    Scenario: Check Logout Button is enabled
        Then Logout Button is enabled

    Scenario: Check Go To Home Button is enabled
        Then Go To Home Button is enabled

    @qabox
    Scenario: Check ToDo List element open todo Page
        And user clicks ToDo List hyperlink
        Then new page url must contain "/todo"