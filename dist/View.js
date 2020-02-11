"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View = /** @class */ (function () {
    function View() {
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
    View.prototype._initLocalListeners = function () {
        var _this = this;
        this.todoList.addEventListener("input", function (event) {
            if (event.target.className === "editable") {
                _this._temporaryTodoText = event.target.innerText;
            }
        });
    };
    Object.defineProperty(View.prototype, "_todoText", {
        get: function () {
            return this.input.value;
        },
        enumerable: true,
        configurable: true
    });
    View.prototype._resetInput = function () {
        this.input.value = "";
    };
    View.prototype.createElement = function (tag, className) {
        var element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    };
    View.prototype.getElement = function (selector) {
        var element = document.querySelector(selector);
        return element;
    };
    View.prototype.displayTodos = function (todos) {
        var _this = this;
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        if (todos.length === 0) {
            var p = this.createElement("p");
            p.textContent = "Nothing to do! Add a task?";
            this.todoList.append(p);
        }
        else {
            todos.forEach(function (todo) {
                var li = _this.createElement("li");
                li.id = todo.id;
                var checkbox = _this.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = todo.complete;
                var span = _this.createElement("span");
                span.contentEditable = "true";
                span.classList.add("editable");
                if (todo.complete) {
                    var strike = _this.createElement("s");
                    strike.textContent = todo.text;
                    span.append(strike);
                }
                else {
                    span.textContent = todo.text;
                }
                var deleteButton = _this.createElement("button", "delete");
                deleteButton.textContent = "Delete";
                li.append(checkbox, span, deleteButton);
                _this.todoList.append(li);
            });
        }
    };
    View.prototype.bindAddTodo = function (handler) {
        var _this = this;
        this.form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (_this._todoText) {
                handler(_this._todoText);
                _this._resetInput();
            }
        });
    };
    View.prototype.bindDeleteTodo = function (handler) {
        this.todoList.addEventListener("click", function (event) {
            if (event.target.className === "delete") {
                var id = event.target.parentElement.id;
                console.log(id);
                handler(id);
            }
        });
    };
    View.prototype.bindToggleTodo = function (handler) {
        this.todoList.addEventListener("change", function (event) {
            if (event.target.type === "checkbox") {
                var id = event.target.parentElement.id;
                handler(id);
            }
        });
    };
    View.prototype.bindEditTodo = function (handler) {
        var _this = this;
        this.todoList.addEventListener("focusout", function (event) {
            if (_this._temporaryTodoText) {
                var id = event.target.parentElement.id;
                handler(id, _this._temporaryTodoText);
                _this._temporaryTodoText = "";
            }
        });
    };
    return View;
}());
exports.default = View;
