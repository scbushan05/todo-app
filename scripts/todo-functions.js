function getSavedTodos() {
    const todoJSON = localStorage.getItem('todos');
    if(todoJSON !== null){
        return JSON.parse(todoJSON);
    }else{
        return [];
    } 
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));    
}

function removeTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if(todoIndex != -1){
        todos.splice(todoIndex, 1);
    }
}

function toggleTodo(element){
    element.completed = !element.completed;
}

function generateTodoDOM(element) {
    const rootEl = $('<div>');
    const checkboxEl = $('<input type="checkbox"/>');
    const todoEl = $('<span>');
    const anchorEl = $('<a href="#">Remove</a>');

    rootEl.addClass('list-item');
    anchorEl.addClass('remove-item');
    todoEl.addClass('todo-name');

    checkboxEl.attr('checked', element.completed);

    checkboxEl.change(function () {
        toggleTodo(element);
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    anchorEl.click(function () {
        removeTodo(element.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    rootEl.append(checkboxEl);

    if(element.text.length > 0){
        todoEl.text(element.text);
    }else{
        todoEl.text('Unnamed Todo');
    }
    rootEl.append(todoEl);
    rootEl.append(anchorEl);
    return rootEl;
}

function renderTodos(todos, filters){
    let count = 0;
    var filteredTodos = $.grep(todos, function (element) {
        return element.text.toLowerCase().includes(filters.searchText.toLowerCase());
    })
    $('.todos').empty();
    $.each(filteredTodos, function (index, element) {
        const todoEl = generateTodoDOM(element);
        $('.todos').append(todoEl);
        if(element.completed == false){
            count++;
        }
    })
    $('.status .container').empty();
    $('.status .container').append(generateSummaryDOM(count));
}

function hideCompleted(todos, filters) {
    var hideCompleted = $.grep(todos, function (element) {
        if (element.completed == filters.hideCompleted) {
            return element;
        }
    })
    renderTodos(hideCompleted, filters);
}

function generateSummaryDOM(count) {
    return 'You have '+count+' todos left';
}
