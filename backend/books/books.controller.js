import Book from "./book.model.js";

export const getRandomBooks = async (req, res) => {
    try {
        console.log("got request...");
        const books = await Book.aggregate([
            { $sample: { size: 10 } },
            {
                $lookup: {
                    from: "authors",
                    localField: "authorIds",
                    foreignField: "_id",
                    as: "authors",
                },
            },
            {
                $addFields: {
                    id: "$_id",
                    author: {
                        $ifNull: [{ $arrayElemAt: ["$authors.name", 0] }, "Unknown Author"],
                    },
                    genre: {
                        $ifNull: ["$genre", { $arrayElemAt: ["$all_genres", 0] }],
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    __v: 0,
                    authorIds: 0,
                    authors: 0,
                },
            },
        ]);
        res.json({ data: books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}