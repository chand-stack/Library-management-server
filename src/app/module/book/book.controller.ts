import { Request, Response } from "express";
import { createBookService } from "./book.service"; 
export const createBook = async (req:Request,res:Response)=>{
try {
    const body = req.body;
    const newBook = await createBookService(body)
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: newBook
    })
} catch (error) {
    res.status(501).json({
        success: false,
        message: "something went wrong",
        data: error
    })
}
}