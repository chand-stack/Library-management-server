import { Borrow } from "../borrow/borrow.model";
import { Book } from "./book.model"

// create book service
export const createBookService = async (book : object)=>{
      const newBook = await Book.create(book)
      return newBook
}

// get book service
// export const getBooksService = async (query: any) => {
//   const filter: any = {};
//   const sorting: any = {};

//   if (query.filter) {
//     filter.genre = query.filter;
//   }

//   if (query.sortBy && query.sort) {
//     sorting[query.sortBy] = query.sort === "asc" ? 1 : -1;
//   }

//   let queryBuilder = Book.find(filter);

//   if (Object.keys(sorting).length > 0) {
//     queryBuilder = queryBuilder.sort(sorting);
//   }

//   if (query.limit && Number(query.limit) > 0) {
//     queryBuilder = queryBuilder.limit(Number(query.limit));
//   }

//   const allBooks = await queryBuilder;
//   return allBooks;
// };
export const getBooksService = async () => {
  const allBooks = await Book.find({});
  return allBooks;
};


// get single book service
export const getSingleBookService = async (bookId : string)=>{
const book = await Book.findById(bookId)
return book
}


// update book service
export const updateBookService = async (bookId: object, newData: any) => {
  const updatedBook = await Book.findOneAndUpdate(bookId, newData, { new: true });

  // Ensure the book exists before calling the method
  if (updatedBook && typeof updatedBook.updateBook === "function") {
    await updatedBook.updateBook(updatedBook._id.toString()); // instance method
  }

  return updatedBook;
};

// delete book service
export const deleteBookService = async (bookId: string) => {
  // Delete the book
  const deletedBook = await Book.findByIdAndDelete(bookId);

  // Delete all borrows related to this book
  await Borrow.deleteMany({ book: bookId });

  return deletedBook;
};