const formTask = document.querySelector('#form-task');
const boxTasks = document.querySelector('.box-tasks');

const tasksStorage = JSON.parse(localStorage.getItem('tasks'));
let tasks = localStorage.getItem('tasks') !== null ? tasksStorage : [];

const taskStorageCompleted = JSON.parse(localStorage.getItem('task-completed'));
let tasksCompleted = localStorage.getItem('task-completed') !== null ? taskStorageCompleted : [];

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorageCompletes() {
    localStorage.setItem('task-completed', JSON.stringify(tasksCompleted));
}

function addToCompleted() {
    for (const { id, name } of tasksCompleted) {
        const completedContainer = document.querySelector('#completed');
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        
        const task = `<p>${name}</p>
        <i id="delete-${id}" title="Deletar tarefa" class="fa-regular fa-trash-can delete"></i>`;
        
        taskDiv.innerHTML = task;
        completedContainer.appendChild(taskDiv);
    }

    for (const { id } of tasksCompleted) {
        const deletedButton = document.querySelector(`#delete-${id}`);
        deletedButton.addEventListener('click', () => {
            deletedCompleted(id);
        });
    }
}

function deleteTask(idTask) {
    tasks = tasks.filter((task) => task.id !== idTask);
    init();
}

function deletedCompleted(idTask) {
    tasksCompleted = tasksCompleted.filter((completed) => completed.id !== idTask);
    init();
    updateLocalStorageCompletes();
}

function addCompletedToLocalStorage(id, name, isCompleted) {
    const completed = {
        id: id,
        name: name,
        isCompleted: isCompleted
    }

    tasksCompleted.push(completed);
    init();
}

function renderTasks() {
    for (const { id, name } of tasks) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const task = `<p>${name}</p>
        <i id="check-${id}" title="Marcar como completa" class="fa-solid fa-check"></i>
        `;
        
        taskElement.innerHTML = task;
        boxTasks.appendChild(taskElement);
    }

    for (const { id, name, isCompleted } of tasks) {
        const idBtnCheck = document.querySelector(`#check-${id}`);
        idBtnCheck.addEventListener('click', () => {
            addCompletedToLocalStorage(id, name, isCompleted);
            deleteTask(id);
            updateLocalStorageCompletes();
        });
    }
}


function getRandomId() {
    return Math.round(Math.random() * 1000);
}

function addTask() {
    const id = getRandomId();
    const taskInput = document.querySelector('#todo');
    const task = {
        id: id,
        name: taskInput.value,
        isCompleted: false
    }
    
    tasks.push(task);
    init();
    taskInput.value = '';
}

function init() {
    document.querySelector('#completed').innerHTML = '';
    boxTasks.innerHTML = '';
    renderTasks();
    addToCompleted();
}

init();

formTask.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
    updateLocalStorage();
})

