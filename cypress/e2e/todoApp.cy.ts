// cypress/e2e/todoApp.cy.ts
import TodoAppTest from '../support/TodoAppTest';

describe('TODO Application - BDD Style Tests', () => {
    const todoApp = new TodoAppTest();

    beforeEach(() => {
        // Given I open the TODO application
        todoApp.visitTodoApp();
    });

    it('should add a new task', () => {
        // When I add a task with a specific name
        const taskName = 'Buy groceries';
        todoApp.addTask(taskName);

        // Then I should see the task in the list
        todoApp.verifyTaskInList(taskName);
    });

    it('should mark a task as completed', () => {
        // Given I have added a task
        const taskName = 'Read a book';
        todoApp.addTask(taskName);

        // When I mark the task as completed
        todoApp.markTaskAsCompleted(taskName);

        // Then the task should be marked as completed
        todoApp.verifyTaskIsCompleted(taskName);
    });

    // it('should edit a task', () => {
    //     // Given I have added a task
    //     const originalTask = 'Complete assignment';
    //     const updatedTask = 'Complete assignment by tomorrow';
    //     todoApp.addTask(originalTask);

    //     // When I edit the task with a new name
    //     todoApp.editTask(originalTask, updatedTask);

    //     // Then I should see the updated task in the list
    //     todoApp.verifyTaskInList(updatedTask);
    // });

    it('should delete a task', () => {
        // Given I have added a task
        const taskName = 'Go for a walk';
        todoApp.addTask(taskName);

        // When I delete the task
        todoApp.deleteTask(taskName);

        // Then I should not see the task in the list
        todoApp.verifyTaskNotInList(taskName);
    });

    it('should clear completed tasks', () => {
        // Given I have added multiple tasks and completed one of them
        const task1 = 'Task 1';
        const task2 = 'Task 2';
        todoApp.addTask(task1);
        todoApp.addTask(task2);
        todoApp.markTaskAsCompleted(task1);

        // When I clear completed tasks
        todoApp.clearCompletedTasks();

        // Then I should only see the remaining uncompleted tasks in the list
        todoApp.verifyTaskNotInList(task1);
        todoApp.verifyTaskInList(task2);
    });
});