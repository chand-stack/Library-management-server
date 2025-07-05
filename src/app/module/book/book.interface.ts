import { Model } from "mongoose";

export interface IBook {
    title: string,
    author : string,
    genre : "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn : string,
    description : string,
    copies : number,
    available : boolean
}

export interface IBookMethods {
  updateBook: (bookId: string) => Promise<void>;
}

export interface BookModel extends Model<IBook, {}, IBookMethods> {}