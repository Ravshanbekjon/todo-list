const elForm = document.querySelector('.form')
const elInput = elForm.querySelector('.form__input')
const elBtn = elForm.querySelector('.form__btn')
const elTemplate = document.querySelector('.template').content
const elList = document.querySelector('.list')

let todosArr = JSON.parse(window.localStorage.getItem('todos')) || []

const checkTodo = (e) => {
    const checkId = e.target.dataset.todoId
    let foundIndex = todosArr.find(i => i.id == checkId)
    foundIndex.isCompleted = !foundIndex.isCompleted
    renderTodos(todosArr, elList)
    window.localStorage.setItem('todos', JSON.stringify(todosArr))
}

const deleteTodo = (e) => {
    const dataId = e.target.dataset.todoId
    let foundIndex = todosArr.findIndex(i => i.id == dataId)
    todosArr.splice(foundIndex, 1)
    renderTodos(todosArr, elList)
    window.localStorage.setItem('todos', JSON.stringify(todosArr))
}

const editTodo = (e) => {
    const dataId = e.target.dataset.todoId
    let foundIndex = todosArr.find(i => i.id == dataId)
    foundIndex.content = prompt("yangilang")
    renderTodos(todosArr, elList)
    window.localStorage.setItem('todos', JSON.stringify(todosArr))
}

function renderTodos(arr, list) {
    list.innerHTML = null
    arr.forEach(i => {
        const cloneTemplate = elTemplate.cloneNode(true)
        let todoContent = cloneTemplate.querySelector('.list__item-content')
        let deleteBtn = cloneTemplate.querySelector('.list__item-btn')
        let editBtn = cloneTemplate.querySelector('.list__item-edit')
        let todoCheck = cloneTemplate.querySelector('.list__item-input')

        if (i.isCompleted) {
            todoContent.style.textDecoration = 'line-through'
            todoContent.style.fontSize = '15px'
            todoContent.style.color = 'gray'
        }

        todoContent.textContent = i.content
        deleteBtn.dataset.todoId = i.id
        todoCheck.dataset.todoId = i.id
        editBtn.dataset.todoId = i.id
        todoCheck.checked = i.isCompleted

        editBtn.addEventListener('click', editTodo)
        todoCheck.addEventListener('change', checkTodo)
        deleteBtn.addEventListener('click', deleteTodo)

        list.appendChild(cloneTemplate)
    });
}

elForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let inputValue = elInput.value.trim()
    todosArr.push({
        id: new Date().getTime(),
        content: inputValue,
        isCompleted: false
    })

    renderTodos(todosArr, elList)
    elInput.focus()
    window.localStorage.setItem('todos', JSON.stringify(todosArr))
    elInput.value = null;
})
renderTodos(todosArr, elList)
