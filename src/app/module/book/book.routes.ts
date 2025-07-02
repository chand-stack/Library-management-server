import { Router } from "express";
import {createBook, deleteBook, getBooks, getSingleBook, updateBook} from "./book.controller"

export const bookRoutes = Router()

bookRoutes.post("/api/create-book", createBook)
bookRoutes.get("/api/books",getBooks)
bookRoutes.get("/api/books/:bookId", getSingleBook)
bookRoutes.put("/api/books/:bookId", updateBook)
bookRoutes.delete("/api/books/:bookId", deleteBook)