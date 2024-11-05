// cypress/support/TodoAppTest.ts
export default class TodoAppTest {
    visitTodoApp(): void {
        cy.visit('https://todomvc.com/examples/react/dist/'); // Replace with the actual URL of the TODO app if needed
    }

    addTask(taskName: string): void {
        cy.get('[data-testid="text-input"]').type(`${taskName}{enter}`);
    }

    markTaskAsCompleted(taskName: string): void {
        // Locate the specific `todo-item` containing the task name and mark it as completed
        cy.get('[data-testid="todo-item"]')
            .contains(taskName)
            .closest('[data-testid="todo-item"]')
            .within(() => {
                cy.get('[data-testid="todo-item-toggle"]').click(); // Click within the context of this item only
            });
    }
    editTask(originalTask: string, updatedTask: string): void {
        // Step 1: Locate and set an alias for the specific `todo-item` containing the original task
        cy.get('[data-testid="todo-list"] li')
            .contains(originalTask)
            .as('taskToEdit'); // Set alias for the specific task item

        // Step 2: Double-click the aliased item to enter edit mode
        cy.get('@taskToEdit').dblclick({ force: true });

        // Step 3: Within the aliased task, find the input field and update the task name
        cy.get('@taskToEdit')
            .find('input.new-todo') // Scope specifically to the edit input within this task
            .should('be.visible')
            .clear()
            .type(`${updatedTask}{enter}`);
    }
    deleteTask(taskName: string): void {
        // Hover over the label to reveal the delete button, then click it with `force: true`
        cy.get('[data-testid="todo-item-label"]')
            .contains(taskName)
            .trigger('mouseover') // Simulate hover on the label
            .closest('[data-testid="todo-item"]') // Scope to the todo-item element
            .find('[data-testid="todo-item-button"]')
            .click({ force: true }); // Click the button with `force: true` to bypass visibility check
    }
    clearCompletedTasks(): void {
        cy.get('.clear-completed').click();
    }

    verifyTaskInList(taskName: string): void {
        cy.get('[data-testid="todo-list"]').should('contain', taskName);
    }

    verifyTaskNotInList(taskName: string): void {
        cy.get('[data-testid="todo-list"]').should('not.contain', taskName);
    }

    verifyTaskIsCompleted(taskName: string): void {
        cy.get('[data-testid="todo-item"]').should('have.class', 'completed').contains(taskName);
    }
}
