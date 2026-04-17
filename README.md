# 📝 Interactive Task Archive

A professional-grade To-Do application built with a modular JavaScript architecture. 

## 🚀 Key Features
- **Dynamic Task Management:** Add, toggle, and delete tasks in real-time.
- **Persistent Storage:** Integrated with `localStorage` so your data survives page refreshes.
- **State Filtering:** View your tasks by status (All, Active, Completed).
- **Responsive Design:** Clean UI built with CSS and mobile-first principles.

## 🛠️ Technical Implementation
This version of the app represents a transition from a single script to a **Modular ES6 Architecture**:

- **Separation of Concerns:** - `state.js`: Manages the "Single Source of Truth" (the `appState` object).
  - `ui.js`: Pure functions dedicated to DOM manipulation and rendering.
  - `storage.js`: Handles data persistence logic.
  - `main.js`: The central hub for event listeners and app initialization.
- **Clean Code Standards:** Refactored for high readability, using descriptive naming conventions and strict equality (`===`).

## 📂 Folder Structure
```text
├── index.html
├── style.css
├── main.js             # Entry point (type="module")
└── js/
    ├── state.js        # Logic & State
    ├── ui.js           # Rendering functions
    └── storage.js      # LocalStorage helpers
