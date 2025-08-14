import { NextFunction  , Request , Response} from "express";




const createUser =  async (req:Request ,res:Response , next:NextFunction)=>{
 return res.json({message :req.body.name || "There is no name in the body"})
}


export {createUser}