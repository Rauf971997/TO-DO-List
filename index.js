// Selectors
const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const addBtn = document.querySelector(".add");
const taskList = document.querySelector("#taskList");
const filterButtons = document.querySelectorAll(".filter-btns button");


// Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);

// Class Task
class Task{
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

      markAsCompleted() {
        this.#isCompleted = true;
      }
    
     markAsUncompleted(){
        this.#isCompleted = false;
      }
}

const task=new Task();

// class Task List
class TaskList{
    #allTasks=[];
   constructor(){};  

   //Validation Form 
   validationForm(title, description) {
    const titleRegex = /^(?!\s)(?![\d\s]+$)([a-zA-Z]{1,16}|[а-яА-Я]{1,16}|\d{1,16})(\s([a-zA-Z]{1,16}|[а-яА-Я]{1,16}|\d{1,16})){1,15}(?<!\s)$/u;
    const descriptionRegex = /^(?!\s+$)([a-zA-Z]{1,16}|[а-яА-Я]{1,16}|\d{1,16})(\s([a-zA-Z]{1,16}|[а-яА-Я]{1,16}|\d{1,16})){0,15}\s*$/u;
    return titleRegex.test(title) && descriptionRegex.test(description) && description.trim() !== title.trim();
  }
  //Validation form end

  addTodo = (e) => {
 
      e.preventDefault();

    const taskTitleValue = taskTitle.value;
    const taskDescriptionValue = taskDescription.value;

    // Validation process
    if (this.validationForm(taskTitleValue,taskDescriptionValue)) {
      // Create div 
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      // Create LI with a link
      const newTodo = document.createElement("li");
      const todoLink = document.createElement("a");
      todoLink.href = `src/page/details.html?id=${encodeURIComponent(task.getId())}`; //For checkout me
      todoLink.textContent = taskTitle.value; 
      newTodo.classList.add("todo-item");
      newTodo.appendChild(todoLink);
      todoDiv.appendChild(newTodo);

      /// Add todo TO LOCALSTORAGE
      saveTodo(taskTitle.value);

      // Check mark button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      // Check Delete Button
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
      taskDescription.value = ""; // Очистить поле с описанием задачи после добавления
    }
    else {
      alert('Incorrect task name. Please follow the entry rules.');
    }

  };

}

const TaskList = new TaskList();

// Event listene for Add Button 
addBtn.addEventListener("click", TaskList.addTodo);

// Event listener for TaskLIst
taskList.addEventListener("click", (e) => {
    const item = e.target;
    
    //  Delete ToDO
    if (item.classList.contains("trash-btn")) {
      const todo = item.parentElement;
      removeLocalTodos(todo);
      todo.remove();
    }
  
    // Check Mark
    if (item.classList.contains("complete-btn")) {
      const todo = item.parentElement;
      const isCompleted = todo.classList.contains("completed");
      
      if (!isCompleted) {
        todo.classList.add("completed"); 
        console.log(`Status changed to Completed`);
      } else {
       
        todo.classList.remove("completed"); 
        console.log(`Status changed to UnCompleted`);
      }
    }
  
    // Edit buttons

  });



//   Filter Method 
filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.textContent.toLowerCase();
      const tasks = Array.from(taskList.children);
  
      tasks.forEach((task) => {
        switch (buttonText) {
          case "all":
            task.style.display = "flex";
            break;
          case "completed":
            task.style.display = task.classList.contains("completed")
              ? "flex"
              : "none";
            break;
          case "uncompleted":
            task.style.display = !task.classList.contains("completed")
              ? "flex"
              : "none";
            break;
          default:
            break;
        }
      });
    });
  });



//   Save Todo LocalStorge
function saveTodo(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
      todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
  }


// Function get Todo for Local Storage  
  function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
      todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  
    todos.forEach(function(todo){
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
     
  
      // Create LI with a link
      const newTodo = document.createElement("li");
      const todoLink = document.createElement("a");
      todoLink.href = `src/page/details.html?id=${encodeURIComponent(task.getId())}`;
      todoLink.textContent = todo; 
      newTodo.classList.add("todo-item");
      newTodo.appendChild(todoLink);
      todoDiv.appendChild(newTodo);
  
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
    });
  }


// Remove LOCalTodos
function removeLocalTodos(todo){
    let todos;
  
    if(localStorage.getItem("todos") === null){
      todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  