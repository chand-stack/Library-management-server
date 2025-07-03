import express, { Application } from "express"
import cors from "cors"
import { bookRoutes } from "./app/module/book/book.routes"
import { borrowRoutes } from "./app/module/borrow/borrow.routes"
const app : Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(bookRoutes)
app.use(borrowRoutes)

app.get('/',(req,res)=>{
    try {
        res.json({
        message:"✅server is running"
    })
    } catch (error) {
        res.json({
        message:"✅something went wrong",
        error: error
    })   
    }
})

export default app