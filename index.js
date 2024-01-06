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
        this.#createDate = createDate;
        this.#isCompleted = false;
      }
}

