let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(){

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index)=>{
        const li = document.createElement('li');

        li.innerHTML = `<span
            class="${task.completed ? 'completed task-text': 'task-text'}"
            onclick="toggleTask(${index})"
        >
        ${task.text}
        </span>
        <div class="li-button">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
        </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask(){
    const input = document.getElementById('textInput');

    tasks.push({
        text: input.value.trim(),
        completed: false
    });

    input.value = '';

    saveTasks();
    renderTasks();
}

function deleteTask(index){
    console.log('myindexvalue', index);
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index){
    const newValue = prompt('Edit Task', tasks[index].text)

    if(newValue !== null){
    tasks[index].text = newValue;
    saveTasks();
    renderTasks();
    }
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

renderTasks();