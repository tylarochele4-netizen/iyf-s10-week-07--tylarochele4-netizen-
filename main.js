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

// --- Event Listeners ---
saveBtn.addEventListener('click', addNote);

// Run this when the page loads
renderArchive();
