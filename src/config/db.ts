import { config } from './config'
import mongoose from 'mongoose'


const connectDB = async ()=>{

    try {
        mongoose.connection.on('connected',()=>{
            console.log("Connection to databases sucessfully")
        })

        mongoose.connection.on('error',(err)=>{
            console.log("Error in connecting databases",err)
        })
        await mongoose.connect(config.databaseUrl as string)
        
        
    } catch (error) {
        console.error("Failed to connect to database",error)
        process.exit(1)
    }
}

export default connectDB 