document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const appContainer = document.getElementById('app');
    let taskList = createTaskList(); // Cria a lista de tarefas logo ao carregar a página

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        addTaskToDOM(task);
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const task = {
                text: taskText,
                completed: false
            };
            addTaskToDOM(task);
            saveTask(task);
            taskInput.value = '';
        }
    });

    function createTaskList() {
        const ul = document.createElement('ul');
        ul.id = 'task-list';
        appContainer.appendChild(ul);
        return ul;
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task.text;
        li.appendChild(span);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '<i class="fa fa-check"></i>';
        toggleButton.addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasksToLocalStorage();
        });
        buttonsContainer.appendChild(toggleButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        deleteButton.addEventListener('click', () => {
            deleteTask(task);
            li.remove();
        });
        buttonsContainer.appendChild(deleteButton);

        li.appendChild(buttonsContainer);
        taskList.appendChild(li);

        if (task.completed) {
            li.classList.add('completed');
        }
    }

    function saveTask(task) {
        savedTasks.push(task);
        saveTasksToLocalStorage();
    }

    function deleteTask(taskToDelete) {
        const index = savedTasks.findIndex(task => task.text === taskToDelete.text);
        if (index !== -1) {
            savedTasks.splice(index, 1);
            saveTasksToLocalStorage();
        }
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
});
