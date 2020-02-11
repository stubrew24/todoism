"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model() {
        this.ids = [];
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    }
    Model.prototype._commit = function (todos) {
        this.onTodoListChanged(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    };
    Model.prototype.uid = function () {
        var id = Math.floor(Math.random() * 167777215).toString(16);
        this.ids.includes(id) ? (id = this.uid()) : this.ids.push(id);
        return id;
    };
    Model.prototype.addTodo = function (todoText) {
        var todo = {
            id: this.uid(),
            text: todoText,
            complete: false
        };
        this.todos.push(todo);
        this._commit(this.todos);
    };
    Model.prototype.editTodo = function (id, updatedText) {
        this.todos = this.todos.map(function (todo) {
            return todo.id === id ? __assign(__assign({}, todo), { text: updatedText }) : todo;
        });
        this._commit(this.todos);
    };
    Model.prototype.deleteTodo = function (id) {
        this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
        this._commit(this.todos);
    };
    Model.prototype.toggleTodo = function (id) {
        this.todos = this.todos.map(function (todo) {
            return todo.id === id ? __assign(__assign({}, todo), { complete: !todo.complete }) : todo;
        });
        this._commit(this.todos);
    };
    Model.prototype.bindTodoListChanged = function (callback) {
        this.onTodoListChanged = callback;
    };
    return Model;
}());
exports.default = Model;
