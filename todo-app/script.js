let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    li.innerHTML = `<span
        class="${task.completed ? 'completed' : 'task'}"
        onclick="toggleComplete(${index})"
        >
        ${task.text}
        </span>
        <div>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        </div>
        `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();

  if (text === '') return;

  tasks.push({
    text,
    completed: false,
  });

  input.value = '';
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newTask = prompt('Edit Task', tasks[index].text);

  if (newTask !== null) {
    tasks[index].text = newTask;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;

  saveTasks();
  renderTasks();
}

renderTasks();
