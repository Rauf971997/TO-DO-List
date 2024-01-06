// Selectors
const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const addBtn = document.querySelector(".add");
const taskList = document.querySelector("#taskList");
const filterButtons = document.querySelectorAll(".filter-btns button");


class Task{
    #id;
    #title;
    #description;
    #createDate;
    #isCompleted;
    constructor(){};
}

class TaskList{
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

