import { Router } from "express";
import {createBook, getBooks, getSingleBook, updateBook} from "./book.controller"

export const bookRoutes = Router()

bookRoutes.post("/api/books", createBook)
bookRoutes.get("/api/books",getBooks)
bookRoutes.get("/api/books/:bookId", getSingleBook)
bookRoutes.put("/api/books/:bookId", updateBook)