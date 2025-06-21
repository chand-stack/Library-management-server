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
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("../book/book.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Book id is required."]
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required."]
    },
    quantity: {
        type: Number,
        required: [true, "Borrow book quantity is required."]
    }
}, {
    versionKey: false,
    timestamps: true
});
// instance method
borrowSchema.method("updateBook", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(bookId);
        const findBook = yield book_model_1.Book.findById(bookId);
        // console.log(findBook);
        if ((findBook === null || findBook === void 0 ? void 0 : findBook.copies) === 0) {
            yield book_model_1.Book.findByIdAndUpdate(bookId, { available: false });
        }
    });
});
// post middleware
borrowSchema.post("save", function name(params, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const findBook = yield book_model_1.Book.findById(params.book);
        // console.log(findBook);
        if (findBook) {
            const newCopies = findBook.copies - params.quantity;
            yield book_model_1.Book.findByIdAndUpdate(params.book, { copies: newCopies });
        }
        next();
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
