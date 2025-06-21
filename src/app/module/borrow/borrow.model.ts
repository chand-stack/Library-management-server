import { model, Schema } from "mongoose";
import { BorrowModel, IBorrow } from "./borrow.interface";
import { Book } from "../book/book.model";

const borrowSchema = new Schema<IBorrow>({
    book:{
        type: Schema.Types.ObjectId,
        required : [true, "Book id is required."]
    },
    dueDate:{
        type:Date,
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

// instance method
borrowSchema.method("updateBook", async function(bookId:string) {
    // console.log(bookId);
    const findBook = await Book.findById(bookId)
    // console.log(findBook);
    if(findBook?.copies === 0){
     await Book.findByIdAndUpdate(bookId, {available:false})
    }
    
})


// post middleware

borrowSchema.post("save", async function name(params, next) {

    const findBook = await Book.findById(params.book)
    // console.log(findBook);
    if(findBook){
     const newCopies = findBook.copies - params.quantity
await Book.findByIdAndUpdate(params.book,{copies:newCopies})
  
    }
  next()

  

})



export const Borrow = model<IBorrow,BorrowModel>("Borrow", borrowSchema)