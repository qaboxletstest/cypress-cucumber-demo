/* eslint-disable no-undef */
class ToDo {
    constructor() {
        if (ToDo._instance) {
            return ToDo._instance
        }
        ToDo._instance = this;
        this.header = "h4.title-todo";
        this.task = "input[name='task']";
        this.submit = "button[type='submit']"
    }

    get title() {
        return cy.get(this.header);
    }

    get inputToDo() {
        return cy.get(this.task);
    }

    get submitBtn() {
        return cy.get(this.submit);
    }

    findToDo(todo) {
        return cy.contains("p", todo)
    }

    selectToDo(todo) {
        cy.contains("p", todo).prev().children(':checkbox').click()
    }

    deleteToDo(todo) {
        cy.contains("p", todo).next().click()
    }
}

const toDoObj = new ToDo()
export default toDoObj