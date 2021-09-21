Feature: Validate ToDo Page

    Validate the elements on ToDo Page and create, delete some todos

    Background: Login and Navigate to ToDo Page
        Given User is logged into the application
        When navigated to ToDo Page

    Scenario: Create a ToDo
        And User enters following Tasks And User Clicks on Submit Button
            | Task              |
            | Like              |
            | Share And         |
            | Subscribe         |
            | QA BOX LET'S TEST |
            | Delete-Me         |
        Then Following New todos should be created
            | Task              |
            | Like              |
            | Share And         |
            | Subscribe         |
            | QA BOX LET'S TEST |
            | Delete-Me         |

    @qabox
    Scenario: Delete a ToDo
        And User enters following Tasks And User Clicks on Submit Button
            | Task      |
            | Delete-Me |
        And User selects a Task and Clicks on X Button
            | Task      |
            | Delete-Me |
        Then Following todo should be deleted
            | Task      |
            | Delete-Me |
