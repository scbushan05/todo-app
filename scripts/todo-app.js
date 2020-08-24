let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters);

$(function(){
    $('#search-todo').on('input', function (e) {
        filters.searchText = e.target.value;
        renderTodos(todos, filters);
    });

    $('#todo-form').on('submit', function (e) {
        e.preventDefault();
        todos.push({
            id: uuidv4(),
            text: $('#add-todo').val(),
            completed: false
        })
        $('#add-todo').val('');
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    $('#hide-completed').change(function (e) {
        if(e.target.checked){
            hideCompleted(todos, filters);
        }else{
            renderTodos(todos, filters);
        }
    })
})
