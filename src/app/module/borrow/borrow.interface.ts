import { Model, Schema } from "mongoose"

export interface IBorrow{
book: Schema.Types.ObjectId,
quantity: number,
dueDate: Date
}

export interface BorrowInstanceMethod{
    updateBook(bookId: string): Promise<void>
}

export interface BorrowModel extends Model<IBorrow, {}, BorrowInstanceMethod> {}




