"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = void 0;
const book_service_1 = require("./book.service");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newBook = yield (0, book_service_1.createBookService)(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook
        });
    }
    catch (error) {
        res.status(501).json({
            success: false,
            message: "something went wrong",
            data: error
        });
    }
});
exports.createBook = createBook;
