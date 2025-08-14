import { NextFunction ,Response ,Request } from "express"



const createBook =  async (req: Request ,res: Response ,next: NextFunction)=>{
    
 return res.json({message:"This is the addbook route"})
}
const updateBook =  async (req: Request ,res: Response ,next: NextFunction)=>{
 return res.json({message:"This is the updateBook route"})
}
const deleteBook = async (req:Request ,res:Response ,next:NextFunction)=>{
 return res.json({message:"This is the delete Book  route"})
}





export {createBook ,updateBook ,deleteBook}