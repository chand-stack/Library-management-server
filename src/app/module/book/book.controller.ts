import { Request, Response } from "express";
import { createBookService, getBooksService } from "./book.service"; 
import mongoose from "mongoose";

// create books controller
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

// get all books controller
export const getBooks = async (req:Request,res:Response) : Promise<any> =>{
try {
  // console.log(req.query.filter, req.query.sortBy, req.query.sort, req.query.limit);
  let query  = {
    filter : req?.query?.filter || "",
    sortBy : req?.query?.sortBy || "",
    sort: req?.query?.sort || "" ,
    limit: Number(req?.query?.limit) || 0
  }
  // console.log(query);
  
  const allBooks = await getBooksService(query)
  res.status(201).json({
    success: true,
    message: "Books retrieved successfully",
    data: allBooks
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
