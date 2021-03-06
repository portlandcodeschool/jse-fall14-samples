$(function () {
  window.todo = {
    title: 'mow the lawn',
    description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass',
    set: function (property, value) {
      this[property] = value;
      $(document).trigger('modelChange', {"model": this})
    },
    get: function (property) {
      return this[property];
    }
  };

  $('#add-todo').click(function (event) {
    event.preventDefault();
    var $todoInput = $('#todo-input');
    var $description = $('#description-input');
    var todoInput = $todoInput.val();
    var descriptionInput = $description.val();
    todo.set('title', todoInput);
    todo.set('description', descriptionInput);
    $description.val('');
    $todoInput.val('');
  });

  function displayTodos (model) {
    console.log('displaying todo list');
    $('#todo-list').html('<li><strong>' + model.get('title') + ':</strong> '
        + model.get('description') + '</li>');
  }

  displayTodos(todo);

  // Pure DOM:
  // document.addEventListener("modelChange", function(e) {
  //   displayTodos(e.detail.model);
  // });
  
  // JQ:
  $(document).on('modelChange', function (event, data) {
    // console.log(event);
    displayTodos(data.model);
  });

});