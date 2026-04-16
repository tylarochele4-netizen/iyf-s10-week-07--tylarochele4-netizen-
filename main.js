// --- CONFIGURATION ---
const TODO_KEY = "todos_archive";

// --- TASK 13.2: PERSISTENT TO-DO (LocalStorage) ---
let todos = JSON.parse(localStorage.getItem(TODO_KEY)) || [];

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');
        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button onclick="toggleTodo(${todo.id})">✓</button>
                <button onclick="deleteTodo(${todo.id})">✕</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

addBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ id: Date.now(), text, completed: false });
        localStorage.setItem(TODO_KEY, JSON.stringify(todos));
        renderTodos();
        todoInput.value = "";
    }
});

window.toggleTodo = (id) => {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    renderTodos();
};

window.deleteTodo = (id) => {
    todos = todos.filter(t => t.id !== id);
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    renderTodos();
};

// --- TASK 13.3: SESSION AUTO-SAVE (SessionStorage) ---
const contactForm = document.getElementById("contact-form");
const formInputs = contactForm.querySelectorAll("input, textarea");

// Load from session on startup
formInputs.forEach(input => {
    const saved = sessionStorage.getItem(`form_${input.name}`);
    if (saved) input.value = saved;

    // Save on every keystroke
    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
    });
});

// Clear session on submit
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Draft Submitted & Cleared!");
    formInputs.forEach(input => {
        sessionStorage.removeItem(`form_${input.name}`);
        input.value = "";
    });
});

// Initial Render
renderTodos();
