import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./user/user.routes.js";
import Bookrouter from "./books/books.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/user", AuthRouter); // login, register, get, update, delete
app.use("/books", Bookrouter); // search, get, update, delete

// Server Port

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
