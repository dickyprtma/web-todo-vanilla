// GET LOCAL STORAGE OBJECT
// PARSET IT FROM STRING TO OBJECT WITH JSON PARSE
// RETURN ARRAY OBJECT
let todos = JSON.parse(localStorage.getItem("todos"))


/*
for testing

console.log(todos)
console.log(todos[0])
console.log(todos[1].name)

*/

// GET HTML ELEMENT TO GET MANIPULATED WITH JS USING DOM
const taskInputElement = document.querySelector(".task-input input")

const taskBox = document.querySelector(".task-box")

function showTodo() {
    let li = ""
    if (todos) {
        todos.forEach((item, i) => {
            // for testing purpose
            // console.log(`${i} : ${item.name}`)
            li += `
            <li class="task">
                    <label for="${i}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${i}">
                        <p>${item.name}</p>
                    </label>
                    <div class="settings">
                        <i class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li><i class="uil uil-pen"></i>Edit</li>
                            <li><i class="uil uil-trash"></i>Hapus</li>
                        </ul>
                    </div>
                </li>
            `
        });
    }

    /* 

    innerHTML akan mereplace apapaun yang berada di dalam
    tag dengan class taskBox
    <element class=task-box> li akan mereplace semua disini </element>

    */
    taskBox.innerHTML = li
}

showTodo()

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild
    if (selectedTask.checked) {
        taskName.classList.add("checked")
    } else {
        taskName.classList.remove("checked")
    }
}

taskInputElement.addEventListener("keyup", e => {
    let userTask = taskInputElement.value.trim()
    if (e.key == "Enter" && userTask !== "") {
        if (!todos) { // jika belum ada buat array baru
            todos = []
        }

        let taskInfo = { name: userTask, status: "pending" }
        todos.push(taskInfo)
        localStorage.setItem("todos", JSON.stringify(todos))
        showTodo()
    }
})