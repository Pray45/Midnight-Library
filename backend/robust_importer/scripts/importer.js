import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../../db.js";
import { searchBooks } from "../services/googleBooks.provider.js";
import { normalizeBook } from "../services/normalizer.js";
import { upsertAuthors } from "../services/author.js";
import { upsertBook } from "../services/book.js";

export default async function runImporter() {

    // connectDB();
    // console.log("Connected to MongoDB");

    const seeds = [
        "subject:fiction",
        "subject:fantasy",
        "subject:romance",
        "subject:history",
        "subject:science",
        "subject:programming",
        "subject:business",
        "subject:psychology",
        "subject:manga",
        "subject:thriller",
        "subject:self-help",
        "subject:biography"
    ];

    const response = await searchBooks("subject:fiction");

    for (const item of response.items) {
        const book = normalizeBook(item);
        const authorIds = await upsertAuthors(book.authors);
        await upsertBook(book, authorIds);
        console.log(`Imported: ${book.title}`);
    }

    console.log("Done.");
    // await mongoose.disconnect();
}

runImporter().catch(console.error);