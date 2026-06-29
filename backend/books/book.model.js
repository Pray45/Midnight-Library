import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({

    openLibraryId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },

    title: {
        type: String,
        required: true,
    },

    subtitle: String,

    authors: {
        type: [String],
        default: [],
    },

    authorIds: {
        type: [String],
        default: [],
    },  

    cover: String,

    description: String,

    all_genres: [String],

    genre: string,

    publishYear: Number,
    
    languages: [String],

    pageCount: Number,

    isbn10: [String],

    isbn13: [String],

    series: String,

    seriesPosition: Number,
},
    {
        timestamps: true,
    }
)

const Book = mongoose.model("Book", bookSchema);

export default Book;