import { NextFunction, Response, Request } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from 'node:fs'
const createBook = async (req: Request, res: Response, next: NextFunction) => {
   const {title ,genre} = req.body
    //  console.log(req.files)

    // uplaoding file to the cloudinary
    const files = req.files as { [filename: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        fileName
    );
    console.log(
        "THis is the filepath ,coverIamge ,filePath",
        coverImageMimeType,
        fileName,
        filePath
    );
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "book-covers",
            format: coverImageMimeType
        });

        // for pdf file upload
        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(
            __dirname,
            "../../public/data/uploads",
            bookFileName
        );

        const bookFileUploadResult = await cloudinary.uploader.upload(
            bookFilePath,
            {
                resource_type: "raw",
                filename_override: bookFileName,
                folder: "bookPdfs",
                format: "pdf"
            }
        );
        console.log(
            "Does the file is uplaod in cloudinary",
            bookFileUploadResult
        );

        console.log(uploadResult);
 
        // create a book and add to database

        const newBook = await bookModel.create({
            title,
            genre,
            author: "fdfdfdf",
            coverImage:uploadResult.secure_url,
            file:bookFileUploadResult.secure_url
        });

// delete the temp file


await fs.promises.unlink(filePath)
await fs.promises.unlink(bookFilePath)



res.json(201).json({
   id:newBook._id
})


    } catch (error) {
        console.log(error);
        return next(createHttpError(500, "Faild to upload file in Server"));
    }

    return res.json({ message: "This is the addbook route" });
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ message: "This is the updateBook route" });
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ message: "This is the delete Book  route" });
};

export { createBook, updateBook, deleteBook };
