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
exports.createBook = void 0;
const book_service_1 = require("./book.service");
const mongoose_1 = __importDefault(require("mongoose"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newBook = yield (0, book_service_1.createBookService)(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
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
});
exports.createBook = createBook;
