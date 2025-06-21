import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";



const bookSchema = new Schema<IBook>({
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

export const Book = model<IBook>("Book",bookSchema)




