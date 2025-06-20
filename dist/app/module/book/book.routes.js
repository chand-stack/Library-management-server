"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
exports.bookRoutes = (0, express_1.Router)();
exports.bookRoutes.post("/api/books", book_controller_1.createBook);
exports.bookRoutes.get("/api/books", book_controller_1.getBooks);
