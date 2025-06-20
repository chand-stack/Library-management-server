import { Request, Response } from "express";
import mongoose from "mongoose";
import { createBorrowService, getAllBorrowService } from "./borrow.service";

export const createBorrow = async(req:Request,res:Response):Promise<any>=>{
try {
    const {book,quantity,dueDate} = req.body
    // console.log(data);
    const borrowBook = await createBorrowService(book,quantity,dueDate)
    res.status(201).json({
        success: true,
        message:"Book borrowed successfully",
        data: borrowBook
    })
    
} catch (error : any) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
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
        message: "Validation failed",
        success: false,
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
      message: "Something went wrong",
      success: false,
      error: error.message || error,
    });
  }
}

export const getAllBorrow = async(req:Request,res:Response):Promise<any>=>{
try {
  const allBorrow = await getAllBorrowService()
    res.status(201).json({
        success: true,
        message:"Borrowed books summary retrieved successfully",
        data: allBorrow
    })
} catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
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
        message: "Validation failed",
        success: false,
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
      message: "Something went wrong",
      success: false,
      error: error.message || error,
    });
  }
}