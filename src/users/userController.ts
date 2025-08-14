import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All field are required");
        return next(error);
    }

    //Process to create the user
    //Database call
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            const error = createHttpError(
                400,
                "User already exist with this email"
            );
            return next(error);
        }
    } catch (error) {
        return next(createHttpError(500, "Error while geting user"));
    }
    // if not user add user to the dataBase
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser: User;
    try {
        newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
    } catch (error) {
        return next(createHttpError(500, "Error while creating user"));
    }

    //Token generation JWT

    try {
        const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
            expiresIn: "7d",
            algorithm: "HS256",
        });
        return res.json({ accessToken: token });
    } catch (error) {
        return next(createHttpError(500, "Errror while siging jwt token"));
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // 1. Validate incoming request body
        if (!email || !password) {
            return next(
                createHttpError(400, "Email and password are required.")
            );
        }

        // 2. Find the user in the database
        const user: User | null = await userModel.findOne({ email });

        // Authenticate the user.
        // Use a generic error message for security to prevent user enumeration.
        if (!user) {
            return next(createHttpError(404, "Invalid email or password."));
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createHttpError(404, "Invalid email or password."));
        }

        // Generate a JSON Web Token (JWT)

        const token = sign({ sub: user._id }, config.jwtSecret as string, {
            expiresIn: "7d",
            algorithm: "HS256",
        });

        // Send a successful response with the JWT token
        return res.status(200).json({
            message: "Login successful.",
            accessToken: token,
        });
    } catch (error) {
        console.error("Login error:", error);

        return next(
            createHttpError(500, "An unexpected error occurred during login.")
        );
    }
};

export { createUser, loginUser };
