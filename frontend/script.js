const API_URL = 'http://localhost:5000/tasks';

const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const filter = document.getElementById('filter');

// Fetch tasks
async function fetchTasks() {
  loading.textContent = 'Loading tasks...';
  error.textContent = '';

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    taskList.innerHTML = '';

    const selectedFilter = filter.value;

    const filteredTasks = data.filter(task => {
      if (selectedFilter === 'completed') return task.completed;
      if (selectedFilter === 'incomplete') return !task.completed;
      return true;
    });

    filteredTasks.forEach(task => {
      const li = document.createElement('li');

      // Task title
      const span = document.createElement('span');
      span.textContent = task.title;

      if (task.completed) {
        span.style.textDecoration = 'line-through';
      }

      li.appendChild(span);

      // COMPLETE BUTTON
      const completeBtn = document.createElement('button');
      completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
      completeBtn.onclick = () => toggleTask(task.id);
      li.appendChild(completeBtn);

      // EDIT BUTTON (FIXED POSITION)
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';

      editBtn.onclick = async () => {
        const newTitle = prompt('Edit task title:', task.title);

        if (!newTitle || !newTitle.trim()) return;

        try {
          await fetch(`${API_URL}/${task.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
          });

          fetchTasks();
        } catch {
          error.textContent = 'Failed to edit task';
        }
      };

      li.appendChild(editBtn);

      // DELETE BUTTON
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => deleteTask(task.id);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });

  } catch (err) {
    error.textContent = 'Failed to load tasks';
  } finally {
    loading.textContent = '';
  }
}

// Add task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = taskInput.value;

  if (!title.trim()) {
    error.textContent = 'Task title cannot be empty';
    return;
  }

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    taskInput.value = '';
    fetchTasks();

  } catch {
    error.textContent = 'Failed to add task';
  }
});

// Toggle task
async function toggleTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH'
    });
    fetchTasks();
  } catch {
    error.textContent = 'Failed to update task';
  }
}

// Delete task
async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    fetchTasks();
  } catch {
    error.textContent = 'Failed to delete task';
  }
}

// Filter change
filter.addEventListener('change', fetchTasks);

// Initial load
fetchTasks();