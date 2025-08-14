import express, { NextFunction, Request, Response } from "express";
import { createUser, loginUser } from "./userController";



 const userRouter = express.Router()


 // Create the  routes

  userRouter.post("/register",createUser);
  userRouter.post("/login",loginUser)

 export default userRouter