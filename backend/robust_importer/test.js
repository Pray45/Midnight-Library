import { searchBooks } from "./services/googleBooks.provider.js";
import { normalizeBook } from "./services/normalizer.js";
import { upsertAuthors } from "./services/author.js";
import { upsertBook } from "./services/book.js";

export default async function test() {

    const data = await searchBooks("Harry Potter");
    const book = normalizeBook(data.items[0]);
    const authorIds = await upsertAuthors(book.authors);
    const saved = await upsertBook(book, authorIds);

    
    console.log(saved);
    console.log(book);

};