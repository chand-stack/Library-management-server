import { Book } from "./book.model"

// create book service
export const createBookService = async (book : object)=>{
      const newBook = await Book.create(book)
      return newBook
}

// get book service
export const getBooksService = async(query : any)=>{
  const filter: any = {};
  const sorting: any = {};

  if (query.filter) {
    filter.genre = query.filter;
  }

  if (query.sortBy && query.sort) {
    sorting[query.sortBy] = query.sort === "asc" ? 1 : -1;
  }

  let queryBuilder = Book.find(filter);

  if (Object.keys(sorting).length > 0) {
    queryBuilder = queryBuilder.sort(sorting);
  }

  const limit = query.limit && Number(query.limit) > 0 ? Number(query.limit) : 30;
  queryBuilder = queryBuilder.limit(limit);

  const allBooks = await queryBuilder;
  return allBooks;
}


// get single book service
export const getSingleBookService = async (bookId : string)=>{
const book = await Book.findById(bookId)
return book
}


// update book service
export const updateBookService = async (bookId : object, newData : object) => {
      const updatedBook = await Book.findOneAndUpdate(bookId,newData,{new:true})
      return updatedBook
}


// delete book service
export const deleteBookService = async(bookId:string)=>{
      const deleteBook = await Book.findByIdAndDelete(bookId)
      return deleteBook
}