const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './tasks.json';

// Load data
let tasks = [];
let currentId = 1;

if (fs.existsSync(DATA_FILE)) {
  const data = fs.readFileSync(DATA_FILE);
  tasks = JSON.parse(data);

  if (tasks.length > 0) {
    currentId = Math.max(...tasks.map(t => t.id)) + 1;
  }
}

// Save function
function saveTasks() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: 'Title is required and must be a non-empty string'
    });
  }

  const newTask = {
    id: currentId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks();

  res.status(201).json(newTask);
});

// PATCH /tasks/:id (edit + toggle)
app.patch('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: 'Title must be a non-empty string'
      });
    }
    task.title = title.trim();
  } else {
    task.completed = !task.completed;
  }

  saveTasks();
  res.json(task);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }

  tasks.splice(index, 1);
  saveTasks();

  res.json({ message: 'Task deleted successfully' });
});

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});