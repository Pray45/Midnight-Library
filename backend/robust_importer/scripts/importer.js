import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});

import mongoose from "mongoose";
import connectDB from "../../db.js";

import searchSeeds from "../seed.js";

import { searchBooks } from "../services/googleBooks.provider.js";
import { normalizeBook } from "../services/normalizer.js";
import { upsertAuthors } from "../services/author.js";
import { upsertBook } from "../services/book.js";

import { loadProgress, saveProgress } from "./progress.js";

const PAGE_SIZE = 40;
const PAGE_STEP = 20;      // Google is returning 20 books/page
const MAX_PAGES = 15;
const REQUEST_DELAY = 300;

export default async function runImporter() {
    await connectDB();

    console.log("Connected to MongoDB");

    const progress = await loadProgress();

    let startQuery = 0;

    if (progress.query) {
        const idx = searchSeeds.indexOf(progress.query);
        startQuery = idx === -1 ? 0 : idx;
    }

    for (let queryIndex = startQuery; queryIndex < searchSeeds.length; queryIndex++) {

        const query = searchSeeds[queryIndex];

        let page =
            progress.query === query
                ? progress.page ?? 0
                : 0;

        let imported = 0;
        let failed = 0;

        console.log("\n==================================");
        console.log(`Starting Query : ${query}`);
        console.log("==================================");

        while (page < MAX_PAGES) {

            console.log(`\nPage ${page + 1}/${MAX_PAGES}`);

            const response = await searchBooks(
                query,
                page * PAGE_STEP,
                PAGE_SIZE
            );

            if (!response) {
                console.log("No response received.");
                break;
            }

            const books = response.items ?? [];

            if (books.length === 0) {
                console.log("No more books.");
                break;
            }

            console.log(`Total Items : ${response.totalItems}`);
            console.log(`Returned    : ${books.length}`);

            for (const item of books) {

                try {

                    const book = normalizeBook(item);

                    const authorIds = await upsertAuthors(book.authors);

                    await upsertBook(book, authorIds);

                    imported++;

                    console.log(`✔ ${book.title}`);

                } catch (err) {

                    failed++;

                    console.error(err.message);

                }

            }

            page++;

            await saveProgress({
                query,
                page,
            });

            console.log("--------------------------------");
            console.log(`Imported : ${imported}`);
            console.log(`Failed   : ${failed}`);
            console.log(`Progress : ${page}/${MAX_PAGES}`);
            console.log("--------------------------------");

        }

        // Reset page when moving to next query
        await saveProgress({
            query: searchSeeds[queryIndex + 1] ?? null,
            page: 0,
        });
    }

    console.log("\nImport Completed Successfully.");

    await mongoose.disconnect();
}

runImporter().catch(async (err) => {
    console.error(err);
    await mongoose.disconnect();
});