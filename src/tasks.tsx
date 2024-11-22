const taskForm = document.querySelector<HTMLFormElement>(".form")!;

const formInput = document.querySelector<HTMLInputElement>(".form-input");

const taskListElement = document.querySelector<HTMLUListElement>(".list");

type Task = {
  description: string;
  isCompleted: boolean;
};

const tasks: Task[] = loadTasks();

tasks.forEach((task) => renderTask(task));

function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function createTask(event: SubmitEvent) {
  event.preventDefault();
  const taskDescription = formInput?.value;

  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    addTask(task);
    renderTask(task);
    updateStorage();

    formInput.value = "";
    return;
  }
  alert("Please enter a value");
}

function addTask(task: Task): void {
  tasks.push(task);
  console.log(tasks);
}

function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;

  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });

  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
}

function updateStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", createTask);
