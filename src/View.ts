class View {
  private app;
  private title;
  private form;
  private input;
  private todoList: HTMLElement;
  private _temporaryTodoText: string;

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

    this.todoList = this.createElement("ul", "todo-list");

    this.form.append(this.input);

    this.app.append(this.title, this.form, this.todoList);

    this._initLocalListeners();
  }

  _initLocalListeners() {
    this.todoList.addEventListener("input", event => {
      if ((<HTMLInputElement>event.target).className === "editable") {
        this._temporaryTodoText = (<HTMLInputElement>event.target).innerText;
      }
    });
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  createElement(tag: string, className?: string) {
    const element = document.createElement(tag);
    if (className) element.className = className;

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

        const span = this.createElement("div");
        span.contentEditable = "true";
        span.classList.add("editable");

        if (todo.complete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        const checkbox = this.createElement("button", "checkbox btn");
        checkbox.innerHTML = "&#10004;";
        li.append(checkbox, span, checkbox);

        const deleteButton = this.createElement("button", "delete btn");
        deleteButton.innerHTML = "&#10008;";
        li.append(span, checkbox, deleteButton);

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
      if ((<HTMLButtonElement>event.target).className === "delete btn") {
        const id = (<HTMLButtonElement>event.target).parentElement.id;
        console.log(id);
        handler(id);
      }
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("click", event => {
      if ((<HTMLInputElement>event.target).className === "checkbox btn") {
        const id = (<HTMLInputElement>event.target).parentElement.id;
        handler(id);
      }
    });
  }

  bindEditTodo(handler) {
    this.todoList.addEventListener("focusout", event => {
      if (this._temporaryTodoText) {
        const id = (<HTMLInputElement>event.target).parentElement.id;
        handler(id, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }
}

export default View;
