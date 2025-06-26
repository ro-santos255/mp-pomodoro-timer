const taskOl = document.getElementById("tasks");
const newtaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const taskTemplate = document.getElementById("task-template");

renderTasksFromLocalStorage();

addTaskButton.addEventListener("click", function() {
  const newTask = newtaskInput.value;

  addTask(newTask);
});

function renderTask(newTask) {
  const taskTemplateClone = taskTemplate.content.cloneNode(true);
  const newTasKElement = taskTemplateClone.querySelector(".task");
  const taskText = newTasKElement.querySelector(".task-text");

  const deleteButton = taskTemplateClone.querySelector(".delete-task");
  deleteButton.addEventListener("click", function() {
    deleteTask(newTask.id);
  });
  newTasKElement.id = newTask.id;
  taskText.textContent = newTask.name;

  taskOl.appendChild(taskTemplateClone);
}

function saveTaskToLocalStorage(task) {
  let tasks = localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(tasks) || []; 
  parsedTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(parsedTasks));
}

function renderTasksFromLocalStorage() {
  taskOl.innerHTML  = ""; // Clear existing tasks 

  const tasks = localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(tasks) || [];

  parsedTasks.forEach(task => {
    renderTask(task);
  });
}

function addTask(task) {
  const newTask = {
    id: Math.random().toString(16).slice(2), // Generate a random ID
    name: task
  }

  renderTask(newTask);
  saveTaskToLocalStorage(newTask);
}

function deleteTask(taskId) {
  // deletar da página 
  const taskToDelete = document.getElementById(taskId); 
  taskToDelete.remove();

  // deletar do localStorage
  let tasks = localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(tasks) || [];

  const filteredTasks = parsedTasks.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}