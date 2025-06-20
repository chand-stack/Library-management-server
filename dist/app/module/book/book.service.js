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
exports.getSingleBookService = exports.getBooksService = exports.createBookService = void 0;
const book_model_1 = require("./book.model");
const createBookService = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.create(book);
    return newBook;
});
exports.createBookService = createBookService;
const getBooksService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const allBooks = yield book_model_1.Book.find({ genre: query === null || query === void 0 ? void 0 : query.filter }).sort({ createdAt: query === null || query === void 0 ? void 0 : query.sort }).limit(query.limit);
    return allBooks;
});
exports.getBooksService = getBooksService;
const getSingleBookService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    return book;
});
exports.getSingleBookService = getSingleBookService;
