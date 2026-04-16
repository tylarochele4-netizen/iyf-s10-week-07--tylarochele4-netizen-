import { appState, addTodo, toggleTodo, deleteTodo } from './js/state.js';
import { renderTodos } from './js/ui.js';

// Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');

// 1. Initial Render
renderTodos(appState.todos, appState.filter, 'todoList');

// 2. Event: Adding a Task
addBtn.addEventListener('click', () => {
    addTodo(todoInput.value);
    todoInput.value = "";
    renderTodos(appState.todos, appState.filter, 'todoList');
});

// 3. Event: Clicking buttons inside the list (Event Delegation)
document.getElementById('todoList').addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains('toggle-btn')) {
        toggleTodo(id);
    } else if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id);
    }
    
    renderTodos(appState.todos, appState.filter, 'todoList');
});

// 4. Event: Filtering
window.setFilter = (newFilter) => {
    appState.filter = newFilter;
    renderTodos(appState.todos, appState.filter, 'todoList');
};
