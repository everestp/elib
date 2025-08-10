import express, { NextFunction, Request, Response } from "express";



const app = express();


app.use(express.json());

// Routes



// Http methods: GET, POST, PUT, PATCH, DELETE



app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to elib apis" });
});


export default app;
