import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./users/userRouter";
import bookRouter from "./book/bookRouter";



const app = express();
app.use(express.json());

// Routes



// Http methods: GET, POST, PUT, PATCH, DELETE



app.get("/", (req, res, next) => {
  
     res.json({ message: "Welcome to elib apis" });
});
app.use("/api/users",userRouter)
app.use("/api/books",bookRouter)


app.use(globalErrorHandler)

export default app;
