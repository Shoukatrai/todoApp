const inputValue = document.getElementById("input")
const parentContainer = document.querySelector(".ParentContainer")
let allTodoData = []

const createNote = async () => {
    try {
        console.log(inputValue.value)
        if(inputValue.value === ""){
            alert("Enter any note!")
            return
        }
        const body = {
            todo: inputValue.value
        }

        const response = await fetch("http://localhost:2020/createTodo", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
        console.log("response", response)
        inputValue.value = ""
        getTodos()
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}


const getTodos = async () => {
    try {
        const data = await fetch("http://localhost:2020/getTodo")
            .then(res => res.json())
        const todoData = data.data
        console.log("todoData", todoData)
        allTodoData = todoData
        parentContainer.innerHTML = ""
        todoData.map(obj => {
            // allTodoData.push(obj)
            console.log(obj)
            const noteEle = document.createElement("div")
            noteEle.className = "notes"
            noteEle.innerHTML = `<span>${obj.todo}</span>
            <div class="btns">
                <button onclick = "editTodo(this)" id = "${obj._id}">
                <ion-icon name="create-outline"></ion-icon>
                </button>
                <button onclick = "deleteTodo(this)"  id = "${obj._id}">
                <ion-icon name="trash-outline"></ion-icon>
                </button>
            <div/>`
            parentContainer.appendChild(noteEle)
        })
    } catch (error) {

    }
}

const editTodo = async (ele) => {
    try {
        console.log(ele.id)
        const editValue = prompt("Enter edit value!")
        const body = {
            todo: editValue
        }
        const response = await fetch(`http://localhost:2020/editTodo/${ele.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        console.log(response)
        getTodos()
    } catch (error) {
        alert(error.message)
    }
}


const deleteTodo = async (ele) => {
    try {
        console.log(ele.id)
        const response = await fetch(`http://localhost:2020/deleteTodo?id=${ele.id}`, {
            method: "DELETE"
        })
        console.log(response)
        alert("Todo Deleted!")
        getTodos()
    } catch (error) {
        alert(error.message)
        console.log("delete error", error)
    }
}

const allTodoDelete = async () => {
    try {
        console.log(allTodoData, 'allTodoData')
        const ids = allTodoData.map((obj) => {
            return obj._id
        })
        const idObj = {
            ids
        }
        console.log("ids", idObj)
        const response = await fetch("http://localhost:2020/deleteAll", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(idObj)

        }).then(res => res.json())
        console.log("response ", response)
        getTodos()
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

window.addEventListener("load", getTodos)
window.allTodoDelete = allTodoDelete
window.deleteTodo = deleteTodo
window.editTodo = editTodo
window.getTodos = getTodos
window.createNote = createNote 