import { Router } from "express";
import {createBook, getBooks, getSingleBook} from "./book.controller"

export const bookRoutes = Router()

bookRoutes.post("/api/books", createBook)
bookRoutes.get("/api/books",getBooks)
bookRoutes.get("/api/books/:bookId", getSingleBook)