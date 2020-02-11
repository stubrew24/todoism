class Model {
  ids = [];

  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  _commit(todos) {
    this.onTodoListChanged(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  uid() {
    let id = Math.floor(Math.random() * 167777215).toString(16);
    this.ids.includes(id) ? (id = this.uid()) : this.ids.push(id);
    return id;
  }

  addTodo(todoText) {
    const todo = {
      id: this.uid(),
      text: todoText,
      complete: false
    };

    this.todos.push(todo);

    this._commit(this.todos);
  }

  editTodo(id, updatedText) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, text: updatedText } : todo
    );

    this._commit(this.todos);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);

    this._commit(this.todos);
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    this._commit(this.todos);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }
}

class View {
  constructor() {
    this.app = this.getElement("#root");
    this.app.className = "card";

    this.title = this.createElement("h1");
    this.title.className = "card-title";
    this.title.textContent = "TODOISM";

    this.form = this.createElement("form");
    this.form.className = "form";

    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Add todo";
    this.input.name = "todo";
    this.input.className = "form-control";

    // this.submitButton = this.createElement("button");
    // this.submitButton.textContent = "Submit";
    // this.submitButton.className = "col-md-6 btn btn-primary";

    this.todoList = this.createElement("ul", "todo-list");

    this.form.append(this.input);

    this.app.append(this.title, this.form, this.todoList);

    this._temporaryTodoText;
    this._initLocalListeners();
  }

  _initLocalListeners() {
    this.todoList.addEventListener("input", event => {
      if (event.target.className === "editable") {
        this._temporaryTodoText = event.target.innerText;
      }
    });
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  displayTodos(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do! Add a task?";
      this.todoList.append(p);
    } else {
      todos.forEach(todo => {
        const li = this.createElement("li");
        li.id = todo.id;

        const checkbox = this.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;

        const span = this.createElement("span");
        span.contentEditable = true;
        span.classList.add("editable");

        if (todo.complete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        const deleteButton = this.createElement("button", "delete");
        deleteButton.textContent = "Delete";
        li.append(checkbox, span, deleteButton);

        this.todoList.append(li);
      });
    }
  }

  bindAddTodo(handler) {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", event => {
      if (event.target.className === "delete") {
        const id = event.target.parentElement.id;
        console.log(id);
        handler(id);
      }
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", event => {
      if (event.target.type === "checkbox") {
        const id = event.target.parentElement.id;
        handler(id);
      }
    });
  }

  bindEditTodo(handler) {
    this.todoList.addEventListener("focusout", event => {
      if (this._temporaryTodoText) {
        const id = event.target.parentElement.id;
        handler(id, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onTodoListChanged(this.model.todos);

    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);
    this.view.bindEditTodo(this.handleEditTodo);

    this.model.bindTodoListChanged(this.onTodoListChanged);
  }

  onTodoListChanged = todos => {
    this.view.displayTodos(todos);
  };

  handleAddTodo = todoText => this.model.addTodo(todoText);

  handleEditTodo = (id, todoText) => this.model.editTodo(id, todoText);

  handleDeleteTodo = id => this.model.deleteTodo(id);

  handleToggleTodo = id => this.model.toggleTodo(id);
}

const app = new Controller(new Model(), new View());
