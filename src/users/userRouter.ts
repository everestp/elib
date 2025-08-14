import express, { NextFunction, Request, Response } from "express";
import { createUser } from "./userController";



 const userRouter = express.Router()


 // Create the  routes

  userRouter.post("/register",createUser);
 export default userRouter