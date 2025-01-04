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
    todos.forEach((item, i) => {
        // for testing purpose
        // console.log(`${i} : ${item.name}`)
        li += `
        <li class="task">
                <label for="${i}">
                    <input type="checkbox" id="1">
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
    taskBox.innerHTML = li
}
showTodo()

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