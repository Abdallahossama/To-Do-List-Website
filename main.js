// Create tasks array
let tasks = [
  {
    title: "Study Java",
    date: "24/1/2024",
    isDone: false,
  },
  {
    title: "shopping",
    date: "25/1/2024",
    isDone: false,
  },
  {
    title: "Workout",
    date: "26/1/2024",
    isDone: false,
  },
];

// local storage
function getTasks() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (retrievedTasks==null) {
    tasks = [];
  }else{
    tasks = retrievedTasks;
  }
}
getTasks();
function storeTasks() {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
}

// fill tasks function
function fillTasks() {
  document.getElementById("task_holder").innerHTML = ``;
  let Counter = 0;
  for (let i = 0; i < tasks.length; i++) {
    let content = `
    <div class="task ${tasks[i].isDone ? "done" : ""}">
    <div class="info">
    <h2>${tasks[i].title}</h2>
          <i class="fa-regular fa-calendar-days"></i>
          <span>${tasks[i].date}</span>
          </div>
        <div class="tasks_btns">
        <button onclick="deleteTask(${Counter})" id="delete">
        <i class="fa-solid fa-trash"></i>
        </button>

        ${
          tasks[i].isDone
            ? `
        <button onclick="done(${Counter})" id="notDone">
        <i class="fa-regular fa-circle-xmark"></i>
        </button>
        `
            : `
        <button onclick="done(${Counter})" id="done">
        <i class="fa-solid fa-check"></i>
        </button>
        `
        }

        <button onclick="edit(${Counter})" id="edit">
        <i class="fa-regular fa-pen-to-square"></i>
        </button>
        </div>
        </div>
        `;
    Counter++;
    document.getElementById("task_holder").innerHTML += content;
  }
}
// Display tasks
fillTasks();

// Add task button
document.getElementById("add").addEventListener("click", () => {
  title_Name = prompt("Add new task : ");
  if (title_Name != null) {
      let now = new Date();
      let add_date =
        now.getDate() +
        "/" +
        eval(now.getMonth() + 1) +
        "/" +
        now.getFullYear();
      let o = {
        title: title_Name,
        date: add_date,
        isDone: false,
      };
      tasks.push(o);
      storeTasks();
      fillTasks();
  }

});

//delete task button
function deleteTask(index) {
  let isDelete = confirm(
    `Are you sure you want to delete ${tasks[index].title} task?`
    
  );
  if (isDelete) {
    tasks.splice(index, 1);
    storeTasks();
    fillTasks();
  }

}
//delete task button
function edit(index) {
  let edit = prompt(`Write the new task : `);
  tasks[index].title = edit;
  storeTasks();
  fillTasks();
}
//done task button
function done(index) {
  if (tasks[index].isDone) {
    tasks[index].isDone = false;
  } else {
    tasks[index].isDone = true;
  }
  storeTasks();
  fillTasks();
}
