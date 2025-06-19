
import mongoose from "mongoose";
import app from "./app";
import  config  from "./app/module/config/index";


const PORT = 5000;
async function main(){
    try {
        await mongoose.connect(config.db_uri!)
        console.log("✅ Database connected successfully");
        
            app.listen(PORT,()=>{
            console.log(`✅ server is running on port ${PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

main()