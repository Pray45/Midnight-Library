import Book from "../../books/book.model.js";

export function isValidBook(book) {

    if (!book.title)
        return false;

    if (!book.sourceId)
        return false;

    return true;
}

export async function upsertBook(book, authorIds) {

    if (!isValidBook(book)) {
        throw new Error("Invalid book data");
    }

    const payload = {
        ...book,
        authorIds,
    };

    return await Book.findOneAndUpdate(
        {
            source: book.source,
            sourceId: book.sourceId,
        },
        payload,
        {
            returnDocument: "after",
            upsert: true,
            runValidators: true,
        }
    );
}