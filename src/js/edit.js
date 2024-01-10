document.querySelector(".toHome").addEventListener("click", function() {
    window.location.href = "../../index.html"; 
  });
  
  
  document.addEventListener("DOMContentLoaded", () => {
      const changeStatusButton = document.getElementById("changeStatusButton");
      const urlParams = new URLSearchParams(window.location.search);
      const taskId = urlParams.get("id");
  
      const taskDetails = getTaskDetailsById(taskId);
      if (taskDetails) {
        document.getElementById("taskTitle").value = taskDetails.title;
        document.getElementById("taskDescription").value = taskDetails.description;
      } else {
        alert("Oooops Error 404 Not found");
      }
  
   
      if (taskDetails && taskDetails.isCompleted) {
        changeStatusButton.style.backgroundColor = "green";
      }
  
      changeStatusButton.addEventListener("click", function (event) {
        event.preventDefault();
  
        const task = getTaskDetailsById(taskId);
  
        if (task) {
          const newStatus = !task.isCompleted;
          updateTodoStatusInLocalStorage(taskId, newStatus);
          changeStatusButton.style.backgroundColor = newStatus ? "green" : "";
        } else {
          console.log("Task details not found for the provided ID");
        }
      });
  
      document.getElementById("editTaskButton").addEventListener("click", function (event) {
        const updatedTaskTitle = document.getElementById("taskTitle").value;
        const updatedTaskDescription = document.getElementById("taskDescription").value;
  
        if (validationForm(updatedTaskTitle, updatedTaskDescription)) {
          updateTaskInLocalStorage(taskId, updatedTaskTitle, updatedTaskDescription);
          window.location.href = "../../index.html";
        } else {
          alert("Incorrect task name. Please follow the entry rules.");
        }
      });
    });
  
    function getTaskDetailsById(taskId) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      return todos.find((task) => task.id === taskId) || null;
    }
  
    function validationForm(title, description) {
      const titleRegex =/^(?!\s)(?![\d\s]+$)([a-zA-Z]{1,16}|[а-яА-ЯёЁ]{1,16}|\d{1,16})(\s([a-zA-Z]{1,16}|[а-яА-ЯёЁ]{1,16}|\d{1,16})){1,15}(?<!\s)$/u;
        const descriptionRegex = /^(?!\s+$)([a-zA-Z\s]{1,16}|[а-яА-ЯёЁ\s]{1,16}|\d{1,16})(\s([a-zA-Z\s]{1,16}|[а-яА-ЯёЁ\s]{1,16}|\d{1,16})){0,15}\s*$/u;
      return (
        titleRegex.test(title) &&
        descriptionRegex.test(description) &&
        description.trim() !== title.trim()
      );
    }
  
    function updateTaskInLocalStorage(taskId, updatedTitle, updatedDescription) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const updatedTodos = todos.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            title: updatedTitle,
            description: updatedDescription,
          };
        }
        return task;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  
    function updateTodoStatusInLocalStorage(taskId, newStatus) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const updatedTodos = todos.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isCompleted: newStatus,
          };
        }
        return task;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }