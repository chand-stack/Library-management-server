import { Request, Response } from "express";
import { createBookService } from "./book.service"; 
import mongoose from "mongoose";
export const createBook = async (req:Request,res:Response): Promise<any>=>{
try {
    const body = req.body;
    const newBook = await createBookService(body)
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: newBook
    })
} catch (error : any) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: {
          name: error.name,
          errors: error.errors,
        },
      });
    }
    if (error.code === 11000 && error.name === 'MongoServerError') {
      const duplicatedField = Object.keys(error.keyValue)[0];
      const duplicatedValue = error.keyValue[duplicatedField];
      return res.status(409).json({
        success: false,
        message: "Validation failed",
        error: {
          name: "DuplicateKeyError",
          errors: {
            [duplicatedField]: {
              message: `The ${duplicatedField} "${duplicatedValue}" already exists.`,
              name: "DuplicateError",
              kind: "unique",
              path: duplicatedField,
              value: duplicatedValue
            }
          }
        }
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
}
