document.querySelector(".toHome").addEventListener("click", function () {
  window.location.href = "../../index.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  const storedData = localStorage.getItem("todos");
  const todos = JSON.parse(storedData) || [];

  const taskDetails = todos.find((task) => task.id === taskId);

  if (taskDetails) {
    displayTaskDetails(taskDetails);
  } else {
    alert("Oops, 404 Error: Task not found");
  }
});

function displayTaskDetails(taskDetails) {
  const taskIdElement = document.getElementById("taskId");
  const taskTitleElement = document.getElementById("taskTitle");
  const taskDescriptionElement = document.getElementById("taskDescription");
  const taskCreateDateElement = document.getElementById("taskCreateDate");
  const taskStatusElement = document.getElementById("taskStatus");

  taskIdElement.textContent = taskDetails.id;
  taskTitleElement.textContent = taskDetails.title;
  taskDescriptionElement.textContent = taskDetails.description;
  taskCreateDateElement.textContent = taskDetails.createDate;
  taskStatusElement.textContent = taskDetails.isCompleted
    ? "Completed"
    : "Incomplete";
}
