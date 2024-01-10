// Selectors
const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const addBtn = document.querySelector(".add");
const taskList = document.querySelector("#taskList");
const filterButtons = document.querySelectorAll(".filter-btns button");


class Task {
  #id;
  #title;
  #description;
  #createDate;
  #isCompleted;

  constructor(title, description) {
    this.#id = Math.random().toString(16).slice(2);
    this.#title = title;
    this.#description = description;
    this.#createDate = this.getCurrentDateTime();
    this.#isCompleted = false;
  }

  getCurrentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }


  toObject() {
    return {
      title: this.#title,
      description: this.#description,
      createDate: this.#createDate,
      isCompleted: this.#isCompleted
    };
  }


  getId() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  getDescription() {
    return this.#description;
  }

  getCreateDate() {
    return this.#createDate;
  }

  getIsCompleted() {
    return this.#isCompleted;
  }

}


// Class Task LIst
class TaskList {
  #tasks = [];


  validationForm(title, description) {
    const titleRegex = /^(?!\s)(?![\d\s]+$)([a-zA-Z]{1,16}|[а-яА-ЯёЁ]{1,16}|\d{1,16})(\s([a-zA-Z]{1,16}|[а-яА-ЯёЁ]{1,16}|\d{1,16})){1,15}(?<!\s)$/u;
    const descriptionRegex = /^(?!\s+$)([a-zA-Z\s]{1,16}|[а-яА-ЯёЁ\s]{1,16}|\d{1,16})(\s([a-zA-Z\s]{1,16}|[а-яА-ЯёЁ\s]{1,16}|\d{1,16})){0,15}\s*$/u;
    return titleRegex.test(title) && descriptionRegex.test(description) && description.trim() !== title.trim();
  }


  addTodo = (e) => {
    e.preventDefault();
    const taskTitleValue = taskTitle.value;
    const taskDescriptionValue = taskDescription.value;

 
    //  Todo div
    if (this.validationForm(taskTitleValue,taskDescriptionValue)) {
      const newTask = new Task(taskTitleValue, taskDescriptionValue);
      const taskId = newTask.getId(); 
      this.addTasks(newTask); 
      updateTasks();   

      const sortSelect = document.getElementById('sortSelect');
      sortSelect.value = 'default';

      // Create div 
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      todoDiv.dataset.id = taskId; 

      // Create LI with a link
      const newTodo = document.createElement("li");
      const todoLink = document.createElement("a");
      todoLink.textContent = taskTitle.value; 
      newTodo.classList.add("todo-item");
      newTodo.appendChild(todoLink);
      todoDiv.appendChild(newTodo);

      /// Add todo TO LOCALSTORAGE
      saveTodo({ id: taskId, ...newTask.toObject() });

      // Check mark button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      // Check Trash Button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      // Edit Button
      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.classList.add("edit-btn");
      todoDiv.appendChild(editBtn);
    
      // Append to list
      taskList.appendChild(todoDiv); 

      // Clear Todo InputValue
      taskTitle.value = "";
      taskDescription.value = ""; 
    } 
    
    else {
      alert('Incorrect task name. Please follow the entry rules!');
    }

    console.log(task.getTasks());
  
  };


  addTasks(...tasks) {
    tasks.forEach(task => {
      const taskExists = this.#tasks.find(existingTask => existingTask.getId() === task.getId());
      if (!taskExists) {
        this.#tasks.push(task);
      }
    });
  }

  deleteTask(taskId) {
    const taskIndex = this.#tasks.findIndex(task => task.getId() === taskId);

    if (taskIndex !== -1) {
      this.#tasks.splice(taskIndex, 1);
      console.log(this.#tasks)
    }
  }
  
    
  getTasks() {
    return [...this.#tasks];
  }

 
}


const task = new TaskList();

// Event Listener
addBtn.addEventListener("click", task.addTodo);



taskList.addEventListener("click", (e) => {
  e.stopPropagation(); 

  const item = e.target;
  const todo = item.closest(".todo");
  const taskId = todo.dataset.id;

  if (item.classList.contains("trash-btn") || item.classList.contains("fa-trash")) {
    task.deleteTask(taskId); 
    removeLocalTodos(taskId);
    todo.remove();
  }

  if (item.classList.contains("complete-btn") || item.classList.contains("fa-check")) {
    const isCompleted = todo.classList.toggle("completed");
    saveTodoStatus(taskId, isCompleted);
  }

// Для кнопки редактирования
if (item.classList.contains("edit-btn") || item.classList.contains("fa-edit")) {
  const todo = item.closest(".todo");
  const taskId = todo.dataset.id;
  if (taskId) {
    const editURL = `src/page/edit.html?id=${encodeURIComponent(taskId)}`;
    window.location.href = editURL;
  } else {
    console.error('Task ID is missing or not found.');
  }
}
  

  // Для ссылок на подробности задачи
  const link = e.target.closest("a");
  if (link) {
    const taskId = link.closest(".todo").dataset.id;
    window.location.href = `src/page/details.html?id=${encodeURIComponent(taskId)}`;
  }

});



// //////LOcal Storage Function
// Функция для изменения статуса выполнения задачи
function saveTodoStatus(taskId, isCompleted) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const foundIndex = todos.findIndex((todo) => todo.id === taskId);

  if (foundIndex !== -1) {
    todos[foundIndex].isCompleted = isCompleted;
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const todoDiv = document.querySelector(`[data-id="${taskId}"]`);
    const completedButton = todoDiv.querySelector(".complete-btn");
  if (isCompleted) {
    completedButton.style.backgroundColor = "green"; 
  } else {
    completedButton.style.backgroundColor = "red"; 
  }  //Super Finally

}




// Функция для сохранения задачи в localStorage
function saveTodo(taskObject) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.push(taskObject);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// ====================================



function getTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach(function(task) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.dataset.id = task.id;

    const newTodo = document.createElement("li");
    const todoLink = document.createElement("a");
    todoLink.textContent = task.title;
    newTodo.classList.add("todo-item");
    newTodo.appendChild(todoLink);
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add("edit-btn");
    todoDiv.appendChild(editBtn);

    if (task.isCompleted) {
      todoDiv.classList.add("completed");
      completedButton.style.backgroundColor = "green";
    } else {
      completedButton.style.backgroundColor = "red"; 
    }

    taskList.appendChild(todoDiv);
  });
}


function removeLocalTodos(taskId) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const updatedTodos = todos.filter((todo) => todo.id !== taskId);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));

  task.deleteTask(taskId); 
  
  
  taskList.innerHTML = ""; 
  getTodos(); 
}






function updateTasks(sortBy = 'default', filter = 'all') {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  
  if (filter !== 'all') {
    todos = todos.filter(task => {
      if (filter === 'completed') {
        return task.isCompleted;
      } else {
        return !task.isCompleted;
      }
    });
  }

  if (sortBy === 'title') {
    todos.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'date') {
    todos.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
  }

  const taskList = document.getElementById('taskList');
  taskList.innerHTML = "";

  todos.forEach(function(task) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.dataset.id = task.id;

    const newTodo = document.createElement("li");
    const todoLink = document.createElement("a");
    todoLink.textContent = task.title;
    newTodo.classList.add("todo-item");
    newTodo.appendChild(todoLink);
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add("edit-btn");
    todoDiv.appendChild(editBtn);

    if (task.isCompleted) {
      todoDiv.classList.add("completed");
      completedButton.style.backgroundColor = "green"; 
    } else {
      completedButton.style.backgroundColor = "red"; 
    }

    taskList.appendChild(todoDiv);
  });

}




document.addEventListener('DOMContentLoaded', () => {
  getTodos(); 
  updateTasks(); 
  const sortSelect = document.getElementById('sortSelect');
  const filterButtons = document.querySelectorAll('.filter-btn');

  sortSelect.addEventListener('change', (event) => {
    const sortBy = event.target.value;
    const filter = document.querySelector('.filter-btn.active').textContent.toLowerCase();
    updateTasks(sortBy, filter);
  });

  
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filter = this.textContent.toLowerCase();
      sortSelect.value ="default"; 
      updateTasks( sortSelect.value, filter);   
    });
  });
});




