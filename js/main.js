let tasks = [];
let modalMode;
let editTaskElement;
let editTask;
let showMode = "all";
window.addEventListener("load", (_) => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks) {
    tasks.forEach((e) => {
      appendTask(createTask(e));
    });
  }
});
const tasksContainer = document.querySelector("[data-tasks-container]");
//overlay logic
const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");

// event listener
document.addEventListener("click", (e) => {
  const navActiveToggler = e.target.closest("[data-nav-active]");
  if (navActiveToggler) addActiveClass([overlay, navbar]);

  const navCloseToggler = e.target.closest("[data-nav-close]");
  if (navCloseToggler) removeActiveClass([overlay, navbar]);

  const modalActiveToggler = e.target.closest("[data-modal-active]");
  if (modalActiveToggler) {
    const modalSubmit = modal.querySelector("[data-modal-submit]");
    const modalTitle = modal.querySelector("[data-modal-title]");
    // set modal for add task
    if (modalActiveToggler.hasAttribute("data-add-modal")) {
      // reset modal
      modal.querySelector("form").reset();
      modalTitle.textContent = "Add Task";
      modalSubmit.textContent = "Add Task";
      modalMode = "add";
    }
    // set modal for edit task
    else if (modalActiveToggler.hasAttribute("data-edit-task")) {
      modalTitle.textContent = "Edit Task";
      modalSubmit.textContent = "Update Task";
      modalMode = "edit";

      editTaskElement = modalActiveToggler.closest(".task");
      editTask = tasks.find((task) => task.id == editTaskElement.id);

      form.querySelector("#task-title").value = editTask.title;
      form.querySelector("#task-description").value = editTask.description;
      const date = new Date(editTask.date);
      form.querySelector("#task-date").value =
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      form.querySelector(".category .result").textContent = editTask.category;
      let priortyRadio = form.querySelectorAll("input[type='radio']");
      priortyRadio.forEach((e) => {
        if (e.id == editTask.priority) e.checked = true;
      });
    }
    addActiveClass([overlay, modal]);
  }

  // delete task
  const deleteTaskButton = e.target.closest("[data-delete-task]");
  if (deleteTaskButton) {
    const task = deleteTaskButton.closest(".task");
    tasks = tasks.filter((taskItem) => taskItem.id != task.id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    task.remove();
  }

  // complete button
  if (e.target.hasAttribute("data-complete-task")) {
    const task = e.target.closest(".task");
    const element = tasks.find((e) => e.id == task.id);
    element.checked = !element.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // check show mode
    showTasksMode();
  }

  const modalCloseToggler = e.target.closest("[data-modal-close]");
  if (modalCloseToggler) removeActiveClass([overlay, modal]);

  if (e.target === overlay) removeActiveClass([overlay, navbar, modal]);
});

const sortBySelect = document.querySelector("[data-sortBy-select]");

// <div id="urgent-tasks"></div>
// <div id="important-tasks"></div>
// <div id="normal-tasks"></div>

sortBySelect.addEventListener("change", (e) => {
  tasksContainer.innerHTML = "";
  switch (sortBySelect.value) {
    case "priority":
      const urgentArr = [];
      const importantArr = [];
      const normalArr = [];

      tasks.forEach((e) => {
        let taskPriority = e.priority;
        switch (taskPriority) {
          case "urgent":
            urgentArr.push(createTask(e));
            break;
          case "important":
            importantArr.push(createTask(e));
            break;
          case "normal":
            normalArr.push(createTask(e));
        }
      });

      tasksContainer.append(...urgentArr, ...importantArr, ...normalArr);
      break;

    case "date":
      let sortedArr = [];
      tasks.forEach((e, index) => {
        sortedArr.push({
          date: new Date(e.date).valueOf(),
          id: e.id,
          title: e.title,
          i: index,
        });
      });
      sortedArr = sortedArr.sort((a, b) => b.date - a.date);
      sortedArr.forEach((e) => tasksContainer.append(createTask(tasks[e.i])));
      break;
  }
});

const showoptions = document.getElementById("show-options");
showoptions.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    showoptions
      .querySelectorAll("button")
      .forEach((e) => e.classList.remove("active"));
    e.target.classList.add("active");
  }
  showMode = e.target.hasAttribute("data-tasks-done")
    ? "done"
    : e.target.hasAttribute("data-tasks-active")
      ? "active"
      : "all";

  showTasksMode();
});

function showTasksMode() {
  tasksContainer.innerHTML = "";
  switch (showMode) {
    case "all":
      tasks.forEach((e) => {
        appendTask(createTask(e));
      });
      break;

    case "done":
      const doneTasks = tasks.filter((e) => e.checked);
      doneTasks.forEach((e) => {
        appendTask(createTask(e));
      });
      break;

    case "active":
      const activeTasks = tasks.filter((e) => !e.checked);
      activeTasks.forEach((e) => {
        appendTask(createTask(e));
      });
      break;
  }
}

// form logic
const form = document.getElementById("task-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) return;
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value.trim();
  });
  const date = new Date(data.date);
  // set date
  const shortMonth = date.toLocaleString("en", {
    month: "short",
  });
  data.date = `${shortMonth} ${date.getDate()}, ${date.getFullYear()}`;
  // set checked
  data.checked = false;

  switch (modalMode) {
    case "add":
      // set id
      data.id = Date.now();
      appendTask(createTask(data));
      saveTask(data);
      showTasksMode();
      break;
    case "edit":
      data.id = editTask.id;
      tasks[tasks.indexOf(editTask)] = data;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      editTaskElement.replaceWith(createTask(data));
      break;
  }

  removeActiveClass([overlay, modal]);
});

// edit task
const editTaskFun = () => {};
// create task element
const createTask = (data) => {
  const template = document
    .querySelector("#task-template")
    .content.cloneNode(true);

  const taskId = data.id;
  template.querySelector(".task").id = taskId;
  // date
  const taskDate = data.date;
  template.querySelector(".date").textContent = taskDate;

  // title
  const taskTitle = data["title"];
  template.querySelector(".task-title").textContent = taskTitle;

  // category
  const taskCategory = data["category"];
  template.querySelector(".task-category").textContent = taskCategory;

  // description
  const taskDescription = data["description"];
  template.querySelector(".task-description").textContent = taskDescription;

  // priorty
  const taskPriority = data.priority;
  template.querySelectorAll(".priorty-class").forEach((e) => {
    e.classList.add(taskPriority);
  });

  // ckecked
  template.querySelector("#complete-task").checked = data.checked;
  return template;
};

const saveTask = (data) => {
  tasks.push(data);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// append task
const appendTask = (task) => {
  tasksContainer.prepend(task);
};

// custom select
const customSelect = document.querySelectorAll("[data-custom-select]");
customSelect.forEach((element) => {
  element.addEventListener("click", (event) => {
    console.log(event.target, element);
    const selectList = element.querySelector("[data-select-list]");
    const arrow = element.querySelector("[data-select-arrow]");
    const result = element.querySelector(".custom-select .result");

    const input = element.querySelector("input");

    if (event.target.tagName === "LI") {
      result.textContent = event.target.textContent;
      input.value = event.target.dataset.value;
      input.dispatchEvent(new Event("change"));
    }
    selectList.classList.toggle("scale-y-0");
    toggleElements([arrow]);
  });
});

// modal logic
const modal = document.querySelector("[data-modal]");

// toggle function
const toggleElements = (e) => {
  e.forEach((e) => {
    e.classList.toggle("active");
  });
};

const removeActiveClass = (e) => {
  e.forEach((e) => {
    e.classList.remove("active");
  });
};

const addActiveClass = (e) => {
  e.forEach((e) => {
    e.classList.add("active");
  });
};

// set input date min
const todayDate = new Date();
document.querySelector("#task-date").min =
  `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().padStart(2, "0")}-${todayDate.getDate().toString().padStart(2, "0")}`;

// serach

const searchbar = document.querySelector("[data-search-bar]");
if (searchbar) {
  searchbar.addEventListener("input", (e) => {
    searchTask(e.target.value);
  });
}

function searchTask(value) {
  tasksContainer.innerHTML = "";
  tasks.forEach((e) => {
    if (
      (e.title.toLowerCase().includes(value.toLowerCase()) ||
        e.description.toLowerCase().includes(value.toLowerCase())) &&
      (showMode == "all"
        ? true
        : e.checked == (showMode == "done" ? true : false))
    ) {
      appendTask(createTask(e));
    }
  });
}
