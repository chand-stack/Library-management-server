import express, { Application } from "express"
import cors from "cors"
const app : Application = express()

app.use(express.json())
app.use(cors())

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