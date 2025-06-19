import mongoose from "mongoose";
import app from "./app";
import  config  from "./app/module/config/index";



async function main(){
    try {
        await mongoose.connect(config.db_uri!)
        console.log("✅ Database connected successfully");
        
            app.listen(config.port,()=>{
            console.log(`✅ server is running on port ${config.port}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

main()