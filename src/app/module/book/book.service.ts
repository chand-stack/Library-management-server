import { Book } from "./book.model"

export const createBookService = async (book : object)=>{
      const newBook = await Book.create(book)
      return newBook
}

