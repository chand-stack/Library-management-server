"use strict";
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
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
