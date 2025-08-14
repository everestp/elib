import { NextFunction } from "express"
import { HttpError } from "http-errors"
import { config } from "../config/config"
import { Request , Response } from "express"

//Global error handlers is a middleware should be in last
 const globalErrorHandler = ((err:HttpError,req:Request,res:Response,next:NextFunction)=>{
 const statusCode = err.statusCode ||500
 return res.status(statusCode).json({
 message: err.message,
 errorStack:  config.env ==='developement' ?err.stack :""
 })
})


export default globalErrorHandler