import { model, Schema } from "mongoose";
import { BorrowModel, IBorrow } from "./borrow.interface";
import { Book } from "../book/book.model";

const borrowSchema = new Schema<IBorrow>({
    book:{
        type: String,
        required : [true, "Book id is required."]
    },
    dueDate:{
        type:String,
        required:[true, "Due date is required."]
    },
    quantity:{
        type:Number,
        required:[true,"Borrow book quantity is required."]
    }
},{
    versionKey: false,
    timestamps: true
})


borrowSchema.method("updateBook", async function(bookId:string) {
    // console.log(bookId);
    const findBook = await Book.findById(bookId)
    // console.log(findBook);
    if(findBook?.copies === 0){
     await Book.findByIdAndUpdate(bookId, {available:false})
    }
    
})



export const Borrow = model<IBorrow,BorrowModel>("Borrow", borrowSchema)