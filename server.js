// server.js - Express backend with JSON file store for Todos
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

const DATA_FILE = path.join(__dirname, 'data.json');

function readTodos() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(readTodos());
});

// CREATE a new todo
app.post('/api/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: Date.now().toString(),
    text: req.body.text || '',
    completed: false
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// UPDATE a todo
app.put('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const idx = todos.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Todo not found' });
  const updated = { ...todos[idx], ...req.body };
  todos[idx] = updated;
  writeTodos(todos);
  res.json(updated);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  let todos = readTodos();
  const beforeLength = todos.length;
  todos = todos.filter(t => t.id !== req.params.id);
  if (todos.length === beforeLength) return res.status(404).json({ error: 'Todo not found' });
  writeTodos(todos);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});