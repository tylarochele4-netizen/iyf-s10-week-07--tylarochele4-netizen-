import { storage } from './storage.js';

// The Single Source of Truth for your Task Archive
export const appState = {
    todos: storage.load("todos_archive") || [],
    filter: 'all'
};

// Logic for adding a task
export function addTodo(text) {
    if (text) {
        appState.todos.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        storage.save("todos_archive", appState.todos);
    }
}

// Logic for toggling a task
export function toggleTodo(id) {
    const todo = appState.todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        storage.save("todos_archive", appState.todos);
    }
}

// Logic for deleting a task
export function deleteTodo(id) {
    appState.todos = appState.todos.filter(todo => todo.id !=== id);
    storage.save("todos_archive", appState.todos);
}
