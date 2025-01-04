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

const taskInputElement = document.querySelector(".task-input input")

function showTodo() {
    todos.forEach((item, i) => {
        // for testing purpose
        // console.log(`${i} : ${item.name}`)
    });
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