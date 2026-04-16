/* // --- CONFIGURATION ---
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
renderTodos(); */


// ==========================================
// TASK 13.4: STATE MANAGEMENT (The "Brain")
// ==========================================

// 1. The Single Source of Truth
const appState = {
    // Load tasks from LocalStorage (Permanent)
    todos: JSON.parse(localStorage.getItem("todos_archive")) || [],
    // Current filter view
    filter: 'all' 
};

// 2. The Engine: This function handles SAVING and UPDATING the screen
function syncAndRender() {
    // A. Persist the current tasks to LocalStorage (Task 13.2)
    localStorage.setItem("todos_archive", JSON.stringify(appState.todos));
    
    // B. Select the list and clear it
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = "";

    // C. Filter Logic (Task 13.4)
    const filteredTodos = appState.todos.filter(todo => {
        if (appState.filter === 'active') return !todo.completed;
        if (appState.filter === 'completed') return todo.completed;
        return true; // 'all'
    });

    // D. Build the UI based on the filtered state
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');
        
        // Inline style for strike-through if completed
        if (todo.completed) li.style.textDecoration = "line-through";

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

// 3. Action Functions (Modify the State, then Re-render)

window.addTodo = () => {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        appState.todos.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        input.value = "";
        syncAndRender();
    }
};

window.toggleTodo = (id) => {
    appState.todos = appState.todos.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    syncAndRender();
};

window.deleteTodo = (id) => {
    appState.todos = appState.todos.filter(t => t.id !== id);
    syncAndRender();
};

window.setFilter = (newFilter) => {
    appState.filter = newFilter;
    syncAndRender();
};

// ==========================================
// TASK 13.3: SESSION STORAGE (Auto-Save Form)
// ==========================================

const contactForm = document.getElementById("contact-form");
const formInputs = contactForm.querySelectorAll("input, textarea");

// On Load: Fill form with data from current session
formInputs.forEach(input => {
    const savedValue = sessionStorage.getItem(`form_${input.name}`);
    if (savedValue) {
        input.value = savedValue;
    }

    // On Input: Save to SessionStorage (Temporary)
    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
    });
});

// Clear SessionStorage on form submission
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Draft Processed and Session Cleared!");
    formInputs.forEach(input => {
        sessionStorage.removeItem(`form_${input.name}`);
        input.value = "";
    });
});

// ==========================================
// INITIALIZATION
// ==========================================

// Attach the add button listener
document.getElementById('addBtn').addEventListener('click', window.addTodo);

// Run the first render
syncAndRender();
