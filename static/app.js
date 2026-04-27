// app.js - simple frontend logic for interacting with the Todo API
const API_BASE = '/api/todos';

async function fetchTodos() {
  const res = await fetch(API_BASE);
  const todos = await res.json();
  renderTodos(todos);
}

function renderTodos(todos) {
  const container = document.getElementById('todo-list');
  container.innerHTML = '';
  todos.forEach(todo => {
    const div = document.createElement('div');
    div.textContent = `${todo.id}: ${todo.text} ${todo.completed ? '✅' : ''}`;
    container.appendChild(div);
  });
}

// Initial load
fetchTodos();