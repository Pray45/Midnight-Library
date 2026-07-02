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
import { sleep } from "./sleep.js";

const PAGE_SIZE = 40;
const REQUEST_DELAY = 300;

export default async function runImporter() {
    await connectDB();
    console.log("Connected to MongoDB");

    const progress = await loadProgress();
    let startIndex = 0;
    if (progress.query) {
        const index = searchSeeds.indexOf(progress.query);
        startIndex = index === -1 ? 0 : index;
    }

    for (
        let queryIndex = startIndex;
        queryIndex < searchSeeds.length;
        queryIndex++
    ) {
        const query = searchSeeds[queryIndex];

        let page =
            query === progress.query
                ? progress.page
                : 0;

        let totalPages = Infinity;

        let imported = 0;
        let failed = 0;

        console.log("\n==================================");
        console.log(`Starting Query : ${query}`);
        console.log("==================================");

        while (pages < 15) {
            console.log(`\n📖 Page ${page + 1}`);

            const response = await searchBooks(
                query,
                page * PAGE_SIZE,
                PAGE_SIZE
            );

            if (!response.items?.length) {
                console.log("No more books.");
                break;
            }

            const books = response.items ?? [];
            if (books.length === 0) break;

            totalPages = Math.ceil(response.totalItems / PAGE_SIZE);

            console.log(
                `Total Books : ${response.totalItems}`
            );

            console.log(
                `Total Pages : ${totalPages}`
            );

            for (const item of response.items) {
                try {
                    const book = normalizeBook(item);

                    const authorIds = await upsertAuthors(
                        book.authors
                    );

                    await upsertBook(book, authorIds);

                    imported++;

                    console.log(`✔ ${book.title}`);
                } catch (err) {
                    failed++;

                    console.error(
                        `${item.volumeInfo?.title || "Unknown Book"}`
                    );

                    console.error(err.message);
                }
            }

            if (books.length < PAGE_SIZE) {
                break;
            }

            page++;

            await saveProgress({
                query,
                page,
            });

            console.log("\n-------------");
            console.log(`Imported : ${imported}`);
            console.log(`Failed   : ${failed}`);
            console.log(
                `Progress : ${page}/${totalPages}`
            );
            console.log("-------------");

            await sleep(REQUEST_DELAY);
        }
    }

    console.log("\nImport Completed Successfully.");

    await mongoose.disconnect();
}

runImporter().catch(async (err) => {
    console.error(err);

    await mongoose.disconnect();
});