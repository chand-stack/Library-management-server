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
exports.createBorrowService = void 0;
const book_model_1 = require("../book/book.model");
const borrow_model_1 = require("./borrow.model");
const createBorrowService = (book, quantity, dueDate) => __awaiter(void 0, void 0, void 0, function* () {
    const findBook = yield book_model_1.Book.findById(book);
    // console.log(findBook);
    if (!findBook) {
        throw new Error("Book not found");
    }
    if (findBook.copies <= 0) {
        throw new Error("No copies available for borrowing");
    }
    if (findBook.copies < quantity) {
        throw new Error("Not enough copies available");
    }
    if (!findBook.available) {
        throw new Error("Book is currently unavailable");
    }
    const newCopies = findBook.copies - quantity;
    yield book_model_1.Book.findByIdAndUpdate(book, { copies: newCopies });
    const createBorrow = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
    yield createBorrow.updateBook(book);
    return createBorrow;
});
exports.createBorrowService = createBorrowService;
