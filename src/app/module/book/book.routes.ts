import { Router } from "express";
import { createBook } from "./book.controller";

export const bookRoutes = Router()

bookRoutes.post("/api/books", createBook)