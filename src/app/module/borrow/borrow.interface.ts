import { Model } from "mongoose"

export interface IBorrow{
book: string,
quantity: number,
dueDate: string
}

export interface BorrowInstanceMethod{
    updateBook(bookId: string): Promise<void>
}

export interface BorrowModel extends Model<IBorrow, {}, BorrowInstanceMethod> {}



// borrowSchema.post("save", async function name(params, next) {
//     // console.log(params);
//     const findBook = await Book.findById(params.book)
//     // console.log(findBook);
//     if(findBook?.copies === 0){
//      await Book.findByIdAndUpdate(params.book, {available:false})
//     }
//     next()
// })
