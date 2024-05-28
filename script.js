document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Carregar tarefas do Local Storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        addTaskToDOM(task);
    });

    // Adicionar nova tarefa
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

    // Função para adicionar tarefa ao DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '<i class="fa fa-check"></i>';
        toggleButton.addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasksToLocalStorage();
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        deleteButton.addEventListener('click', () => {
            deleteTask(task);
            li.remove();
        });

        li.appendChild(toggleButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Função para salvar tarefas no Local Storage
    function saveTask(task) {
        savedTasks.push(task);
        saveTasksToLocalStorage();
    }

    // Função para excluir tarefa
    function deleteTask(taskToDelete) {
        const index = savedTasks.findIndex(task => task.text === taskToDelete.text);
        if (index !== -1) {
            savedTasks.splice(index, 1);
            saveTasksToLocalStorage();
        }
    }

    // Função para salvar tarefas atualizadas no Local Storage
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
});
