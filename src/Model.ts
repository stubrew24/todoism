interface ITodo {
  id: string;
  text: string;
  complete: boolean;
}

class Model {
  ids: string[] = [];

  public todos: ITodo[];
  public onTodoListChanged;

  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  _commit(todos) {
    this.onTodoListChanged(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  uid(): string {
    let id = Math.floor(Math.random() * 167777215).toString(16);
    this.ids.includes(id) ? (id = this.uid()) : this.ids.push(id);
    return id;
  }

  addTodo(todoText: string) {
    const todo: ITodo = {
      id: this.uid(),
      text: todoText,
      complete: false
    };

    this.todos.push(todo);

    this._commit(this.todos);
  }

  editTodo(id: string, updatedText: string) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, text: updatedText } : todo
    );

    this._commit(this.todos);
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);

    this._commit(this.todos);
  }

  toggleTodo(id: string) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    this._commit(this.todos);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }
}

export default Model;
