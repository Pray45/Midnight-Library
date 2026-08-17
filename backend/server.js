import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import AuthRouter from "./user/user.routes.js";
import Bookrouter from "./books/books.routes.js";
import connectDB from "./db.js";
import { parsePdfBuffer } from "./utils/pdfParser.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });

//-----------------------------> Middlewares

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-----------------------------> connect to database

connectDB();

// runImporter()

//-----------------------------> Routes

app.use("/health", (req, res) => { res.json({ message: "OK" }) }); // test route
app.use("/user", AuthRouter); // login, register, get, update, delete
app.use("/books", Bookrouter); // search, get, update, delete

// PDF Parse Endpoint
app.post("/api/pdf/parse", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const parsedBook = await parsePdfBuffer(req.file.buffer, req.file.originalname);
    res.json({ success: true, book: parsedBook });
  } catch (error) {
    console.error("PDF parse route error:", error);
    res.status(500).json({ error: "Failed to parse PDF file" });
  }
});

//-----------------------------> Server Port

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
