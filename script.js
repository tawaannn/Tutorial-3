const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const taskList = document.querySelector('#task-list');

async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    taskList.innerHTML = '';
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.textContent = task.text + (task.done ? ' ✅ Done' : '');
        taskList.appendChild(li);
    });
}

async function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
    });

    taskInput.value = '';
    loadTasks();
}

addBtn.addEventListener('click', addTask);
loadTasks();