import { searchBooks } from "@totallynotdavid/books";

const searchBookData = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query)
            return res.status(400).json({ error: "Query parameter is required" });

        if (query.length < 3)
            return res
                .status(400)
                .json({ error: "Query parameter must be at least 3 characters long" });

        const books = await searchBooks(query);

        if (!books || books.length === 0)
            return res.status(404).json({ error: "No books found" });

        return res.status(200).json({ success: true, books });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "An error occurred while searching for books",
            details: error.message,
            stack: error.stack,
        });
    }
};


export default searchBookData;