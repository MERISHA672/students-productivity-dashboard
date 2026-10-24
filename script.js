const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");
const progress = document.getElementById("progress");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");

    taskElement.className = `task ${
      task.completed ? "completed" : ""
    }`;

    taskElement.innerHTML = `
      <div class="task-left">
        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
          onchange="toggleTask(${task.id})"
        >

        <span class="task-name">${task.name}</span>

        <span class="priority">${task.priority}</span>
      </div>

      <button
        class="delete-btn"
        onclick="deleteTask(${task.id})"
      >
        🗑️
      </button>
    `;

    taskList.appendChild(taskElement);
  });

  updateStats();
}

function addTask(event) {
  event.preventDefault();

  const name = taskInput.value.trim();

  if (!name) return;

  const task = {
    id: Date.now(),
    name,
    priority: priorityInput.value,
    completed: false
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  taskInput.value = "";
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  renderTasks();
}

function updateStats() {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const remaining = total - completed;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  remainingTasks.textContent = remaining;
  progress.textContent = `${percentage}%`;
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  themeBtn.textContent =
    document.body.classList.contains("dark")
      ? "☀️"
      : "🌙";
});

taskForm.addEventListener("submit", addTask);

renderTasks();
