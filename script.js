document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
    
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
      }
    });
    
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
         
          <button class="status-btn ${task.completed ? 'completed' : ''}" data-index="${index}">
            ${task.completed ? '&#9745;' : '&#9634;'}
          </button>
          <button class="delete-btn" data-index="${index}">
          &#128465;
        </button>
          <button class="edit-btn" data-index="${index}">Edit</button>
        `;
        taskList.appendChild(li);
      });
    }
    
    taskList.addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('delete-btn')) {
        const index = target.getAttribute('data-index');
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      } else if (target.classList.contains('status-btn')) {
        const index = target.getAttribute('data-index');
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      } else if (target.classList.contains('edit-btn')) {
        const index = target.getAttribute('data-index');
        const newText = prompt("Edit Task", tasks[index].text);
        if (newText !== null) {
          tasks[index].text = newText.trim();
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        }
      }
    });
  });
  