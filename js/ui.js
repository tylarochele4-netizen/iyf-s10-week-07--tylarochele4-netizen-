// This function draws the tasks to the screen
export function renderTodos(todos, filter, elementId) {
    const todoList = document.getElementById(elementId);
    if (!todoList) return;

    todoList.innerHTML = "";

    // Apply the filter logic
    const filtered = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    // Create the HTML for each item
    filtered.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) li.style.textDecoration = "line-through";
        
        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button data-id="${todo.id}" class="toggle-btn">✓</button>
                <button data-id="${todo.id}" class="delete-btn">✕</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}
