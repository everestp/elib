import { NextFunction  , Request , Response} from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

import { User } from "./userTypes";



const createUser =  async (req:Request ,res:Response , next:NextFunction)=>{
 const { name ,email , password} = req.body;

 if(!name || !email || !password){
    const error = createHttpError(400,"All field are required" )
    return next(error)
    
 }
 
 //Process to create the user
 //Database call
 try {
    const user = await userModel.findOne({email})
 if(user){
   const error = createHttpError(400 ,"User already exist with this email")
   return next(error)
 }

} catch (error) {
  return next(createHttpError(500 ,"Error while geting user"))
}
 // if not user add user to the dataBase
 const hashedPassword =  await bcrypt.hash(password , 10)
let newUser :User
 try {
   newUser =  await userModel.create({
   name,
   email,
   hashedPassword
 })
 } catch (error) {
   return next(createHttpError(500 ,"Error while creating user"))
 }


 //Token generation JWT
 
 try {
 const token = sign({sub :newUser._id} ,config.jwtSecret as string ,{expiresIn : "7d" ,algorithm:'HS256'})
return  res.status(201).json({accessToken :token})
 } catch (error) {
   return next(createHttpError(500 ,"Errror while siging jwt token"))
 }
 




 
 
 

}




const loginUser = async (req:Request ,res:Response ,next:NextFunction)=>{
const {email ,password} = req.body;
 console.log(email,password)
if(!email || !password){
 const error = createHttpError(400 ,"Please fill the required field")
 return next(error)
}
 
try {
   const user = await userModel.findOne({email})
   if(user){
       const isMatch = await bcrypt.compare(email, user.email);
      return isMatch
   }
  else{
      return next(createHttpError(404 ,"Please enter valid id and passeword"))
  }
   
   
   
} catch (error) {
   return  next(createHttpError(404 ,"Invalid login Crendintals "))
}





}

export {createUser , loginUser}