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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Book title is required."]
    },
    author: {
        type: String,
        required: [true, "Author name is required."]
    },
    genre: {
        type: String,
        required: [true, "Genre is required."],
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, or FANTASY."
        }
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required."],
        unique: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        min: [0, "Number of copies cannot be negative."],
        required: [true, "Number of copies is required."]
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
// Instance method
bookSchema.method("updateBook", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const findBook = yield exports.Book.findById(bookId);
        if (!findBook)
            return;
        if (findBook.copies > 0 && !findBook.available) {
            yield exports.Book.findByIdAndUpdate(bookId, { available: true });
        }
        else if (findBook.copies === 0 && findBook.available) {
            yield exports.Book.findByIdAndUpdate(bookId, { available: false });
        }
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
