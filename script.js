const taskInput = document.querySelector(".taskInput input"),
    taskBox = document.querySelector(".tasks"),
    toolsMenu = document.querySelector(".toolsContent"),
    deleteAll = document.querySelector(".deleteAll"),
    theFilters = document.querySelectorAll(".filters .content span");

let editId,
    isedited = false;

// ###################### THE FILTERS ######################
theFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        printList(btn.id);
    });
});

// ###################### CREATE THE TASK ######################
// GET TO LOCAL STORAGE
let todoLi = JSON.parse(localStorage.getItem("todoList"));

function printList(filters) {
    let item = "";
    if (todoLi) {
        todoLi.forEach((todoLi, id) => {
            // if task is comleted
            let ifCompleted = todoLi.status == "completed" ? "checked" : "";

            // filters
            if (filters == todoLi.status || filters == "all") {
                item += `
            <div class="task">
            <label for="${id}">
                <input onclick="updateCheck(this)" type="checkbox" id="${id}" ${ifCompleted} />
                <p class="${ifCompleted}">${todoLi.name}</p>
            </label>
    <div class="tools">
        <i onclick="showTools(this)" class="fas fa-ellipsis-h ellipsis"></i>
            <ul class="toolsContent">
                <li onclick="edit(${id}, '${todoLi.name}')"><i class="fas fa-edit"></i>Edit</li>
                <li onclick="deleteTask(${id})"><i class="fas fa-trash"></i>Delete</li>
            </ul></div></div>`;
            }
        });
    }
    taskBox.innerHTML =
        item ||
        `<div class="noTasks">
        <img src="./images/bin.png" alt="">
        <p>there is no any tasks start adding task...</p></div>`;
}
printList("all");


// ###################### SHOW TOOLS MENU ######################
function showTools(element) {
    let tools = element.parentElement.lastElementChild;
    tools.classList.add("showTools");

    document.addEventListener("click", (ele) => {
        if (ele.target.tagName != "I" || ele.target != element) {
            tools.classList.remove("showTools");
        }
    });
}
// ###################### EDIT TASK ######################
function edit(taskid, taskname) {
    editId = taskid;
    isedited = true;
    taskInput.value = taskname;
}

// ###################### DELETE TASK ######################
function deleteTask(taskid) {
    todoLi.splice(taskid, 1);
    localStorage.setItem("todoList", JSON.stringify(todoLi));
    printList("all");
}

// ###################### DELETE ALL TASKS ######################
deleteAll.addEventListener("click", () => {
    todoLi.splice(0, todoLi.length);
    localStorage.setItem("todoList", JSON.stringify(todoLi));
    printList("all");
});

// ###################### updateCheck ######################
function updateCheck(seleced) {
    let taskName = seleced.parentElement.lastElementChild;
    if (seleced.checked) {
        taskName.classList.add("checked");
        todoLi[seleced.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todoLi[seleced.id].status = "pending";
    }
    localStorage.setItem("todoList", JSON.stringify(todoLi));
}

// ############### ADD TASK BY PRESS "ENTER BUTTON" ###############
taskInput.addEventListener("keyup", (ev) => {
    let taskContent = taskInput.value.trim();

    if (ev.key == "Enter" && taskContent) {
        if (!isedited) {
            if (!todoLi) {
                todoLi = [];
            }
            let taskInformation = { name: taskContent, status: "pending" };
            todoLi.push(taskInformation);
        } else {
            isedited = false;
            todoLi[editId].name = taskContent;
        }
        taskInput.value = "";
        localStorage.setItem("todoList", JSON.stringify(todoLi));
        printList("all");
    }
});