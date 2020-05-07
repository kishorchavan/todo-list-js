// selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list-ul');
const filterOption = document.querySelector('.filter-todo');

// eventListener

document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', checkTrash);

filterOption.addEventListener('click', filterList);



// fuction

function addTodo(event) {
    event.preventDefault();
    // Add Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Add li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    // savelocal stoarage
    saveLocalStoarage(todoInput.value);

    // Add complete button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fa fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    // Add trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);


    todoList.appendChild(todoDiv);

    // clear input
    todoInput.value = '';

}

function checkTrash(event) {

    const item = event.target;
    // delete todo
    if (item.classList[0] === 'trash-btn') {
        const todoMain = item.parentElement;
        todoMain.classList.add('fall');
        removeLocalTodos(todoMain);
        todoMain.addEventListener('transitionend', function() {
            todoMain.remove();
        })
    }

    // check todo
    if (item.classList[0] === 'complete-btn') {
        const todoMain = item.parentElement;
        todoMain.classList.add('completed');
    }
}


// filter list
function filterList(e) {
    const todos = todoList.childNodes;

    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });

}



function saveLocalStoarage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        // Add Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Add li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);


        // Add complete button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fa fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);

        // Add trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);


        todoList.appendChild(todoDiv);
    })
}


function removeLocalTodos(todoMain) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todoMain.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}