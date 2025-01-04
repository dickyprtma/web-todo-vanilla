// GET DATA FROM LOCAL STORAGE 
// PARSET IT FROM STRING TO OBJECT WITH JSON PARSE
// RETURN ARRAY OBJECT
let todos = JSON.parse(localStorage.getItem("todos"))
let globalUpdateId
let isEditMode = false

let currentFilter = "all"

/*
for testing

console.log(todos)
console.log(todos[0])
console.log(todos[1].name)

*/

// GET HTML ELEMENT TO GET MANIPULATED WITH JS USING DOM
const taskInputElement = document.querySelector(".task-input input")
const taskBox = document.querySelector(".task-box")
const filters = document.querySelectorAll(".filters span")
const clearAll = document.querySelector(".clear-btn")

filters.forEach(spanElement => {
    spanElement.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active")
        spanElement.classList.add("active")
        currentFilter = spanElement.id
        showTodo(spanElement.id)
    })
})


function showTodo(filter) {
    let li = ""
    if (todos) {
        todos.forEach((item, i) => {
            let isCompleted = item.status == "completed" ? "checked" : ""
            // for testing purpose
            // console.log(`${i} : ${item.name}`)

            if (filter == item.status || filter == "all") {
                li += `
                <li class="task">
                        <label for="${i}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${i}" ${isCompleted}>
                            <p class="${isCompleted}">${item.name}</p>
                        </label>
                        <div class="settings">
                            <i onClick=showMenu(this) class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="updateTask(${i}, '${item.name}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick="deleteTask(${i})"><i class="uil uil-trash"></i>Hapus</li>
                            </ul>
                        </div>
                    </li>
                `
            }

        });
    }

    /* 

    innerHTML akan mereplace apapaun yang berada di dalam
    tag dengan class taskBox
    <element class=task-box> li akan mereplace semua disini </element>

    */
    taskBox.innerHTML = li || `<span>Belum ada tugas yang ditambahkan</span>`
}

showTodo("all")

//todo : selectedTask ini element sebaiknya tambahin element di props/param ini
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild


    // alert(selectedTask) // <input>
    // alert(selectedTask.parentElement) // <label>
    // alert(taskName) //<p>

    if (selectedTask.checked) {
        taskName.classList.add("checked")

        // update selected task status
        todos[selectedTask.id].status = "completed"
    } else {
        taskName.classList.remove("checked")
        todos[selectedTask.id].status = "pending"
    }

    // SEDERHANANYA INI MENGUPDATE SELURUH DATA
    // DENGAN MENIMPA JSON YANG LAMA DENGAN JSON YANG BARU
    localStorage.setItem("todos", JSON.stringify(todos))
    showTodo(currentFilter)
}

function showMenu(selectedElement) {
    // mengecek tag element saat ini <i>
    // alert(selectedElement.tagName) 

    let taskMenuElement = selectedElement.parentElement.lastElementChild
    taskMenuElement.classList.add("show")

    document.addEventListener("click", e => {
        // hapus 'show' dari class taskMenu untuk menghilangkan menunya

        /*
        e.target adalah adalah elemen DOM apapun yang memicu event, maksudnya yg diklik user itulah yg akan diambil (dan ini tagnamenya dalam hu ruf besar)
        kalau yg diklik paragraf maka e.target adalah object htmlEelement p
        <p> -> P
        <h1> ->  H1
        */
        // alert(e.target.tagName)

        if (e.target.tagName != "I" || e.target != selectedElement) {
            taskMenuElement.classList.remove("show")
        }
    })
}

function deleteTask(deleteId) {
    // menghapus dari array
    // splice adalah fungsi untuk menghapus elemen dari sebuah array splice(indexDimulai, jumlah elemen yg ingin dihapus)
    todos.splice(deleteId, 1)
    localStorage.setItem("todos", JSON.stringify(todos))

    // refresh data
    showTodo()
}

function updateTask(updateId, taskName) {
    globalUpdateId = updateId
    isEditMode = true
    taskInputElement.value = taskName
}

taskInputElement.addEventListener("keyup", e => {
    let userTask = taskInputElement.value.trim()
    if (e.key == "Enter" && userTask !== "") {
        if (!isEditMode) {
            if (!todos) { // jika belum ada buat array baru
                todos = []
            }
            let taskInfo = { name: userTask, status: "pending" }
            todos.push(taskInfo)
        } else {
            isEditMode = false
            todos[globalUpdateId].name = userTask
        }
        taskInputElement.value = ""
        localStorage.setItem("todos", JSON.stringify(todos))
        showTodo(currentFilter)
    }
})

clearAll.addEventListener("click", () => {
    // removing all items of array and local storage
    todos.splice(0, todos.length)
    localStorage.setItem("todos", JSON.stringify(todos))
    showTodo()
})