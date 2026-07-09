import axios from "axios";

const client = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
    timeout: 30000,
});

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export async function searchBooks(
    query,
    startIndex = 0,
    maxResults = 40
) {

    let retries = 5;

    while (retries--) {

        try {

            const { data } = await client.get("/volumes", {
                params: {
                    q: `inpublisher:${query}`,
                    startIndex,
                    maxResults,
                    printType: "books",
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                },
            });

            return data;

        } catch (err) {

            if (err.response?.status === 429) {

                console.log("Rate limited. Waiting 10 seconds...");

                await sleep(10000);

                continue;
            }

            console.error(err.message);

            return {
                totalItems: 0,
                items: [],
            };
        }
    }

    return {
        totalItems: 0,
        items: [],
    };
}