import Author from "../../author/author.model.js";

function normalizeAuthorName(name) {
    return name
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}

export async function upsertAuthors(authorNames = []) {

    const authorIds = [];

    for (const name of authorNames) {

        if (!name?.trim()) continue;

        const normalizedName = normalizeAuthorName(name);

        const author = await Author.findOneAndUpdate(
            { normalizedName },
            {
                $setOnInsert: {
                    name: name.trim(),
                    normalizedName,
                },
            },
            {
                upsert: true,
                returnDocument: "after",
                setDefaultsOnInsert: true,
            }
        );

        authorIds.push(author._id);
    }

    return authorIds;
}