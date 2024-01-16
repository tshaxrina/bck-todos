let form = document.querySelector(".todoask")
let inp = form.querySelector("#todo")
let container = document.querySelector('.box')
let URL = "http://localhost:9000/todos"
// modal
let modal = document.querySelector('.modal')
let h2 = modal.querySelector('h2')
let modal_form = modal.querySelector('form')
let modal_inp = modal.querySelector('input')
let modal_close = modal.querySelector('.close')
// modal
let todos = []
    fetch(URL)
.then(res => res.json())
.then(res => {
    reload(res)
    todos = res
})



form.onsubmit = (e) => {
    e.preventDefault();

    let fm = new FormData(form)

    let user = {
        fullName: fm.get('todo')
    }

    if(user.fullName === "") return

    fetch(URL, {
        method: "post",
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(res => {
        todos.push(res)
        reload(todos)
    })
}


// reload(todos)

function reload(arr) {
    container.innerHTML = ""

    for (let todo of arr) {
        // a
        let item = document.createElement("div")
        let wrapper = document.createElement("div")
        let info = document.createElement("div")
        let title_text = document.createElement("span")
        let time = document.createElement("span")
        let clsButton = document.createElement("button")
        let img = document.createElement("img")

        // b

        if (todo.isDone === true) {
            title_text.classList.add('done')
        } else {
            title_text.classList.remove('done')
        }

        item.classList.add("item")
        wrapper.classList.add("wrapper")
        info.classList.add("info")
        title_text.classList.add("title")
        time.classList.add("time")

        clsButton.classList.add("del")

        img.src = "img/cls.svg"
        img.alt = "cls"

        title_text.textContent = todo.title
        time.innerHTML = todo.time

        // c
        item.append(wrapper)
        wrapper.append(info, clsButton)
        info.append(title_text, time)
        clsButton.append(img)

        container.append(item)

        // d
        title_text.onclick = () => {
            // todo
            todo.isDone = !todo.isDone

            title_text.classList.toggle('done', todo.isDone)

        }


        item.ondblclick = () => {

            fetch(URL + "/" + item.id, {
                method: "put", 
                body: JSON.stringify({fullName: newName}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    title_text.textContent = newName
                    todos.find(el => el.id === item.id).fullName = newName
                }
            })
            // modal.classList.add('show')
            // h2.innerHTML = `Title: ${todo.title}`
            // modal_inp.setAttribute('placeholder', `change: ${todo.title}`)

            // modal_form.onsubmit = (e) => {
            //     e.preventDefault()

            //     todo.title = modal_inp.value
            //     todo.time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()

            //     title_text.innerHTML = todo.title

            //     modal_form.reset()
            //     modal.classList.remove('show')
            }
            

        }
        clsButton.onclick = () => {
            fetch(URL + "/" + item.id, {
                method: "delete"
            })
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    item.remove()
                } else {
                    alert('Something went wrong!')
                }
            })
                // item.style.display = "none"

                // let isSure = confirm('Are you sure?')

                // if (isSure) {
                //     let idx = arr.indexOf(todo)
                //     todos.splice(idx, 1)
                //     item.remove()
                // }

            }

        

    }

// }

modal_close.onclick = () => {
    modal_form.reset()
    modal.classList.remove('show')
}

