// Define UI variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#search");

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);

    // Add task event
    form.addEventListener("submit", addTask);

    // Clear tasks event
    clearBtn.addEventListener("click", clearTask);

    // Remove task
    taskList.addEventListener("click", removeTask);

    // Filter tasks
    filter.addEventListener("keyup", filterTasks);
}

loadEventListeners();

// Get tasks from localStorage
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.innerText = task;

        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);

        taskList.appendChild(li);
    });
}

// Add new task
function addTask(e) {
    e.preventDefault();

    if (taskInput.value === "") {
        alert("Please fill the field");
    } else {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.innerText = taskInput.value;

        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);

        taskList.appendChild(li);

        // Store in localStorage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = "";
    }
}

// Store task in localStorage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            const taskElement = e.target.parentElement.parentElement;
            taskElement.remove();

            // Remove from localStorage
            removeTaskFromLocalStorage(taskElement);
        }
    }
}

// Remove from localStorage
function removeTaskFromLocalStorage(taskElement) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
        if (taskElement.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearTask() {
    // Option 1: Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearFromLocalStorage();
}

// Clear all from localStorage
function clearFromLocalStorage() {
    localStorage.removeItem("tasks");
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}
