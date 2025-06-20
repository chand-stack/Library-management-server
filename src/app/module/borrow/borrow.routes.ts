import { Router } from "express";
import { createBorrow, getAllBorrow } from "./borrow.controller";

export const borrowRoutes = Router()

borrowRoutes.post("/api/borrow", createBorrow)
borrowRoutes.get("/api/borrow", getAllBorrow)