const inputValue = document.getElementById("input")

const createNote = async () => {
    try {
        console.log(inputValue.value)
        const obj = {
            todo: inputValue.value
        }

        const response = fetch("http://localhost:2020/createTodo", {
            method: "POST",
            headers: {
                "content-type": "application / json"
            },
            body: JSON.stringify(obj)
        })
        .then(res=>res.json())
        console.log(response)
    } catch (error) {
        alert(error.message)
    }


}


window.createNote = createNote 