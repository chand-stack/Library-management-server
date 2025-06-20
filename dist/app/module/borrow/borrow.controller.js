"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBorrow = exports.createBorrow = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const borrow_service_1 = require("./borrow.service");
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        // console.log(data);
        const borrowBook = yield (0, borrow_service_1.createBorrowService)(book, quantity, dueDate);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowBook
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
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
});
exports.createBorrow = createBorrow;
const getAllBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBorrow = yield (0, borrow_service_1.getAllBorrowService)();
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: allBorrow
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
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
});
exports.getAllBorrow = getAllBorrow;
