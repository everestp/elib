import { NextFunction ,Request ,Response } from "express"
import  jwt from 'jsonwebtoken'
import { config } from "../config/config"
import createHttpError from "http-errors"

export  interface AuthRequest extends Request{
  userId:string
}



 const autheticateRequest = (req:Request ,res:Response ,next:NextFunction)=>{
   const token = req.headers["Authorization"]
   if(!token){
    return next(createHttpError(401 ,"Authorization token is required"))

   }


        
  try {
    const parseToken = token && token.toString().split(" ")[1]
    const decode = jwt.verify(parseToken ,config.jwtSecret as string)
    console.log("Decoded",decode)
 
const _req = req as AuthRequest
  _req.userId = decode.sub as string;
  } catch (error) {
    return next(createHttpError(401 ,"Token expired"))
  }



next()


//    const isValid = jwt.verify(token! ,config.jwtSecret!)
//    if(!isValid){
//       res.status(404).json({
//         suscess:false,
//         message :"Invalid token"
//     })
//    }

//    const user = jwt.decode(token!)
   
// req.users =user
// //    res.status(404).json({
// //         suscess:false,
// //         message :""
// //     })
// next()

 }
 


 export default autheticateRequest