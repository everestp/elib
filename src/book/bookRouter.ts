import express from 'express'
import { createBook, deleteBook, getSingleBook, listBook, updateBook } from './bookController'
import multer from 'multer'
import path from 'node:path'
import autheticateRequest from '../middlewares/authMiddleWare'


const bookRouter = express.Router()


//  for parsing multi part file because express cannot do by default
const upload = multer({

dest :path.resolve(__dirname,'../../public/data/uploads'),
limits : {fileSize :3e7}

})
// creates a routes
//Routes to add  book

bookRouter.post("/",autheticateRequest,upload.fields([
    {name: 'coverImage' ,maxCount:1},
    {name: 'file' ,maxCount:1},

]),createBook)


bookRouter.patch("/:booId",autheticateRequest,upload.fields([
    {name: 'coverImage' ,maxCount:1},
    {name: 'file' ,maxCount:1},

]),createBook)


bookRouter.get("/", listBook)
bookRouter.get("/:bookId", getSingleBook)
bookRouter.delete("/:bookId",autheticateRequest ,deleteBook)

export default bookRouter