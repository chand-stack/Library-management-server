"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_routes_1 = require("./app/module/book/book.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(book_routes_1.bookRoutes);
app.get('/', (req, res) => {
    try {
        res.json({
            message: "✅server is running"
        });
    }
    catch (error) {
        res.json({
            message: "✅something went wrong",
            error: error
        });
    }
});
exports.default = app;
