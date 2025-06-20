"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
exports.borrowRoutes = (0, express_1.Router)();
exports.borrowRoutes.post("/api/borrow", borrow_controller_1.createBorrow);
exports.borrowRoutes.get("/api/borrow", borrow_controller_1.getAllBorrow);
