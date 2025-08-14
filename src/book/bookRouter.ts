import express from 'express'
import { createBook, deleteBook, updateBook } from './bookController'


const bookRouter = express.Router()

// creates a routes
//Routes to add  book

bookRouter.post("/add",createBook)

bookRouter.patch("/update",updateBook)

bookRouter.delete("/delete",deleteBook)

export default bookRouter