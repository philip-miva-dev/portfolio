// Academic Planner: add, complete, delete tasks
var tasks = []; // array of { id, text, done }

var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var taskError = document.getElementById("taskError");
var counter = document.getElementById("counter");
var emptyMsg = document.getElementById("emptyMsg");

function saveTasks() {
  try { localStorage.setItem("plannerTasks", JSON.stringify(tasks)); } catch (e) {}
}

function loadTasks() {
  try {
    var saved = localStorage.getItem("plannerTasks");
    if (saved) { tasks = JSON.parse(saved); }
  } catch (e) { tasks = []; }
}

function addTask() {
  var text = taskInput.value.trim();
  if (text === "") {
    taskError.textContent = "Please type a task before adding it.";
    return;
  }
  taskError.textContent = "";
  tasks.push({ id: Date.now(), text: text, done: false });
  taskInput.value = "";
  taskInput.focus();
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) { tasks[i].done = !tasks[i].done; }
  }
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(function (t) {
    var li = document.createElement("li");
    li.className = "task" + (t.done ? " done" : "");

    var box = document.createElement("input");
    box.type = "checkbox";
    box.checked = t.done;
    box.setAttribute("aria-label", "Mark task as completed: " + t.text);
    box.addEventListener("change", function () { toggleTask(t.id); });

    var label = document.createElement("span");
    label.textContent = t.text;

    var del = document.createElement("button");
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", function () { deleteTask(t.id); });

    li.appendChild(box);
    li.appendChild(label);
    li.appendChild(del);
    taskList.appendChild(li);
  });

  var doneCount = tasks.filter(function (t) { return t.done; }).length;
  counter.textContent = tasks.length === 0 ? "" : doneCount + " of " + tasks.length + " tasks completed";
  emptyMsg.style.display = tasks.length === 0 ? "block" : "none";
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") { addTask(); }
});

loadTasks();
renderTasks();
