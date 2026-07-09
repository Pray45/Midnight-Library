import { Router } from "express";
import {
  // searchBooks,
  getRandomBooks,
  // getBookDetails,
} from "./books.controller.js";

const BookRouter = Router();

// BookRouter.get("/search", searchBooks);
BookRouter.get("/random", getRandomBooks);
// BookRouter.get("/:id", getBookDetails);

export default BookRouter;