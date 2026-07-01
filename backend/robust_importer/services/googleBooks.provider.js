import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const client = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
    timeout: 30000,
});

export async function searchBooks(query, startIndex = 0, maxResults = 40) {
    const { data } = await client.get("/volumes", {
        params: {
            q: query,
            startIndex,
            maxResults,
            printType: "books",
            key: process.env.GOOGLE_BOOKS_API_KEY,
        },
    });

    return data;
}

export async function getBook(volumeId) {
    const { data } = await client.get(`/volumes/${volumeId}`);

    return data;
}