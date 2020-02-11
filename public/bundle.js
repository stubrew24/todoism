/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/Controller.js":
/*!****************************!*\
  !*** ./dist/Controller.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Controller = /** @class */ (function () {\n    function Controller(model, view) {\n        var _this = this;\n        this.model = model;\n        this.view = view;\n        this.onTodoListChanged = function (todos) {\n            _this.view.displayTodos(todos);\n        };\n        this.handleAddTodo = function (todoText) { return _this.model.addTodo(todoText); };\n        this.handleEditTodo = function (id, todoText) { return _this.model.editTodo(id, todoText); };\n        this.handleDeleteTodo = function (id) { return _this.model.deleteTodo(id); };\n        this.handleToggleTodo = function (id) { return _this.model.toggleTodo(id); };\n        this.onTodoListChanged(this.model.todos);\n        this.view.bindAddTodo(this.handleAddTodo);\n        this.view.bindDeleteTodo(this.handleDeleteTodo);\n        this.view.bindToggleTodo(this.handleToggleTodo);\n        this.view.bindEditTodo(this.handleEditTodo);\n        this.model.bindTodoListChanged(this.onTodoListChanged);\n    }\n    return Controller;\n}());\nexports.default = Controller;\n\n\n//# sourceURL=webpack:///./dist/Controller.js?");

/***/ }),

/***/ "./dist/Model.js":
/*!***********************!*\
  !*** ./dist/Model.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Model = /** @class */ (function () {\n    function Model() {\n        this.ids = [];\n        this.todos = JSON.parse(localStorage.getItem(\"todos\")) || [];\n    }\n    Model.prototype._commit = function (todos) {\n        this.onTodoListChanged(todos);\n        localStorage.setItem(\"todos\", JSON.stringify(todos));\n    };\n    Model.prototype.uid = function () {\n        var id = Math.floor(Math.random() * 167777215).toString(16);\n        this.ids.includes(id) ? (id = this.uid()) : this.ids.push(id);\n        return id;\n    };\n    Model.prototype.addTodo = function (todoText) {\n        var todo = {\n            id: this.uid(),\n            text: todoText,\n            complete: false\n        };\n        this.todos.push(todo);\n        this._commit(this.todos);\n    };\n    Model.prototype.editTodo = function (id, updatedText) {\n        this.todos = this.todos.map(function (todo) {\n            return todo.id === id ? __assign(__assign({}, todo), { text: updatedText }) : todo;\n        });\n        this._commit(this.todos);\n    };\n    Model.prototype.deleteTodo = function (id) {\n        this.todos = this.todos.filter(function (todo) { return todo.id !== id; });\n        this._commit(this.todos);\n    };\n    Model.prototype.toggleTodo = function (id) {\n        this.todos = this.todos.map(function (todo) {\n            return todo.id === id ? __assign(__assign({}, todo), { complete: !todo.complete }) : todo;\n        });\n        this._commit(this.todos);\n    };\n    Model.prototype.bindTodoListChanged = function (callback) {\n        this.onTodoListChanged = callback;\n    };\n    return Model;\n}());\nexports.default = Model;\n\n\n//# sourceURL=webpack:///./dist/Model.js?");

/***/ }),

/***/ "./dist/View.js":
/*!**********************!*\
  !*** ./dist/View.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar View = /** @class */ (function () {\n    function View() {\n        this.app = this.getElement(\"#root\");\n        this.app.className = \"card\";\n        this.title = this.createElement(\"h1\");\n        this.title.className = \"card-title\";\n        this.title.textContent = \"TODOISM\";\n        this.form = this.createElement(\"form\");\n        this.form.className = \"form\";\n        this.input = this.createElement(\"input\");\n        this.input.type = \"text\";\n        this.input.placeholder = \"Add todo\";\n        this.input.name = \"todo\";\n        this.input.className = \"form-control\";\n        this.todoList = this.createElement(\"ul\", \"todo-list\");\n        this.form.append(this.input);\n        this.app.append(this.title, this.form, this.todoList);\n        this._initLocalListeners();\n    }\n    View.prototype._initLocalListeners = function () {\n        var _this = this;\n        this.todoList.addEventListener(\"input\", function (event) {\n            if (event.target.className === \"editable\") {\n                _this._temporaryTodoText = event.target.innerText;\n            }\n        });\n    };\n    Object.defineProperty(View.prototype, \"_todoText\", {\n        get: function () {\n            return this.input.value;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    View.prototype._resetInput = function () {\n        this.input.value = \"\";\n    };\n    View.prototype.createElement = function (tag, className) {\n        var element = document.createElement(tag);\n        if (className)\n            element.className = className;\n        return element;\n    };\n    View.prototype.getElement = function (selector) {\n        var element = document.querySelector(selector);\n        return element;\n    };\n    View.prototype.displayTodos = function (todos) {\n        var _this = this;\n        while (this.todoList.firstChild) {\n            this.todoList.removeChild(this.todoList.firstChild);\n        }\n        if (todos.length === 0) {\n            var p = this.createElement(\"p\");\n            p.textContent = \"Nothing to do! Add a task?\";\n            this.todoList.append(p);\n        }\n        else {\n            todos.forEach(function (todo) {\n                var li = _this.createElement(\"li\");\n                li.id = todo.id;\n                var span = _this.createElement(\"div\");\n                span.contentEditable = \"true\";\n                span.classList.add(\"editable\");\n                if (todo.complete) {\n                    var strike = _this.createElement(\"s\");\n                    strike.textContent = todo.text;\n                    span.append(strike);\n                }\n                else {\n                    span.textContent = todo.text;\n                }\n                var checkbox = _this.createElement(\"button\", \"checkbox btn\");\n                checkbox.innerHTML = \"&#10004;\";\n                li.append(checkbox, span, checkbox);\n                var deleteButton = _this.createElement(\"button\", \"delete btn\");\n                deleteButton.innerHTML = \"&#10008;\";\n                li.append(span, checkbox, deleteButton);\n                _this.todoList.append(li);\n            });\n        }\n    };\n    View.prototype.bindAddTodo = function (handler) {\n        var _this = this;\n        this.form.addEventListener(\"submit\", function (event) {\n            event.preventDefault();\n            if (_this._todoText) {\n                handler(_this._todoText);\n                _this._resetInput();\n            }\n        });\n    };\n    View.prototype.bindDeleteTodo = function (handler) {\n        this.todoList.addEventListener(\"click\", function (event) {\n            if (event.target.className === \"delete btn\") {\n                var id = event.target.parentElement.id;\n                console.log(id);\n                handler(id);\n            }\n        });\n    };\n    View.prototype.bindToggleTodo = function (handler) {\n        this.todoList.addEventListener(\"click\", function (event) {\n            if (event.target.className === \"checkbox btn\") {\n                var id = event.target.parentElement.id;\n                handler(id);\n            }\n        });\n    };\n    View.prototype.bindEditTodo = function (handler) {\n        var _this = this;\n        this.todoList.addEventListener(\"focusout\", function (event) {\n            if (_this._temporaryTodoText) {\n                var id = event.target.parentElement.id;\n                handler(id, _this._temporaryTodoText);\n                _this._temporaryTodoText = \"\";\n            }\n        });\n    };\n    return View;\n}());\nexports.default = View;\n\n\n//# sourceURL=webpack:///./dist/View.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Model_1 = __webpack_require__(/*! ./Model */ \"./dist/Model.js\");\nvar Controller_1 = __webpack_require__(/*! ./Controller */ \"./dist/Controller.js\");\nvar View_1 = __webpack_require__(/*! ./View */ \"./dist/View.js\");\nvar app = new Controller_1.default(new Model_1.default(), new View_1.default());\n\n\n//# sourceURL=webpack:///./dist/index.js?");

/***/ })

/******/ });