"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller(model, view) {
        var _this = this;
        this.model = model;
        this.view = view;
        this.onTodoListChanged = function (todos) {
            _this.view.displayTodos(todos);
        };
        this.handleAddTodo = function (todoText) { return _this.model.addTodo(todoText); };
        this.handleEditTodo = function (id, todoText) { return _this.model.editTodo(id, todoText); };
        this.handleDeleteTodo = function (id) { return _this.model.deleteTodo(id); };
        this.handleToggleTodo = function (id) { return _this.model.toggleTodo(id); };
        this.onTodoListChanged(this.model.todos);
        this.view.bindAddTodo(this.handleAddTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);
        this.view.bindEditTodo(this.handleEditTodo);
        this.model.bindTodoListChanged(this.onTodoListChanged);
    }
    return Controller;
}());
exports.default = Controller;
