import { NextFunction  , Request , Response} from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";




const createUser =  async (req:Request ,res:Response , next:NextFunction)=>{
 const { name ,email , password} = req.body;
 if(!name || !email || !password){
    const error = createHttpError(400,"All field are required" )
    return next(error)
    
 }
 
 //Process to create the user
 //Database call
 const user = await userModel.findOne({email})
 if(user){
   const error = createHttpError(400 ,"User already exist with this email")
   return next(error)
 }
 
 
 
 
 
 //Response the data
 return  res.json({message :"We are processing your request please hold on"})
}

export {createUser}