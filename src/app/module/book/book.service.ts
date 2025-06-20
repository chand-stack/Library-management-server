import { Book } from "./book.model"

export const createBookService = async (book : object)=>{
      const newBook = await Book.create(book)
      return newBook
}

export const getBooksService = async(query : any)=>{
      
      const allBooks = await Book.find({genre: query?.filter}).sort({createdAt:query?.sort}).limit(query.limit)
      return allBooks
}
