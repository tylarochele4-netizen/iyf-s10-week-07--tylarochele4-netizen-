// --- Helper Functions (from Lesson 13 instructions) ---
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

// --- DOM Elements ---
const noteInput = document.getElementById('noteInput');
const saveBtn = document.getElementById('saveBtn');
const notesDisplay = document.getElementById('notesDisplay');

// --- State ---
// Get existing data from localStorage or start with an empty array
let archive = getFromStorage("myArchive", []);

// --- Functions ---

// Initial render of existing notes
function renderArchive() {
    notesDisplay.innerHTML = ""; // Clear current display
    
    archive.forEach((item) => {
        const p = document.createElement('p');
        p.textContent = `• ${item}`;
        notesDisplay.appendChild(p);
    });
}

// Logic to add a note
function addNote() {
    const text = noteInput.value.trim();
    
    if (text !== "") {
        archive.push(text);          // Update our list
        saveToStorage("myArchive", archive); // Save updated list to LocalStorage
        renderArchive();             // Update the screen
        noteInput.value = "";        // Clear the input field
    }
}


// --- 1. Storage Configuration ---
const STORAGE_KEY = "todos_archive";

// --- 2. Helper Functions (Keep these!) ---
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

// --- 3. State ---
// Load existing todos or start with an empty array
let todos = getFromStorage(STORAGE_KEY, []);

// --- 4. DOM Elements ---
const todoInput = document.getElementById('todoInput'); // Make sure your HTML has this ID
const addBtn = document.getElementById('addBtn');       // Make sure your HTML has this ID
const todoList = document.getElementById('todoList');   // Make sure your HTML has this ID

// --- 5. Functions ---

function renderTodos() {
    todoList.innerHTML = ""; 
    
    todos.forEach((todo) => {
        const li = document.createElement('li');
        
        // If the task is completed, add a strike-through
        if (todo.completed) {
            li.style.textDecoration = "line-through";
        }

        li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="toggleTodo(${todo.id})">Done</button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text === "") return;

    const newTodo = {
        id: Date.now(),      // Unique ID for deleting/toggling
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveToStorage(STORAGE_KEY, todos); // SAVE
    renderTodos();                     // SHOW
    todoInput.value = ""; 
}

// These need to be "window." so the HTML buttons can find them
window.toggleTodo = function(id) {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveToStorage(STORAGE_KEY, todos);
    renderTodos();
}

window.deleteTodo = function(id) {
    todos = todos.filter(t => t.id !== id);
    saveToStorage(STORAGE_KEY, todos);
    renderTodos();
}

// --- 6. Event Listeners ---
if (addBtn) {
    addBtn.addEventListener('click', addTodo);
}

// Initial render when page opens
renderTodos();
// --- Event Listeners ---
saveBtn.addEventListener('click', addNote);

// Run this when the page loads
renderArchive();
