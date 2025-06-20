import { Router } from "express";
import { createBorrow } from "./borrow.controller";

export const borrowRoutes = Router()

borrowRoutes.post("/api/borrow", createBorrow)