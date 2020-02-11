"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("./Model");
var Controller_1 = require("./Controller");
var View_1 = require("./View");
var app = new Controller_1.default(new Model_1.default(), new View_1.default());
