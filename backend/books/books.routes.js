import { Router } from "express";
import searchBookData from "./books.controller.js";

const BookRouter = Router();

BookRouter.get("/search", searchBookData);

export default BookRouter;