import { Book } from "../book/book.model"
import { Borrow } from "./borrow.model";

export const createBorrowService = async(book:string,quantity:number,dueDate:string)=>{
const findBook = await Book.findById(book)
// console.log(findBook);
  if (!findBook) {
    throw new Error("Book not found");
  }

  if (findBook.copies <= 0) {
    throw new Error("No copies available for borrowing");
  }

  if (findBook.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  if (!findBook.available) {
    throw new Error("Book is currently unavailable");
  }
  
const newCopies = findBook.copies - quantity
await Book.findByIdAndUpdate(book,{copies:newCopies})

const createBorrow = await Borrow.create({book,quantity,dueDate})

await createBorrow.updateBook(book)

return createBorrow


}