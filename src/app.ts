import express, { Application } from "express"
import cors from "cors"
import { bookRoutes } from "./app/module/book/book.routes"
const app : Application = express()

app.use(express.json())
app.use(cors())

app.use(bookRoutes)

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