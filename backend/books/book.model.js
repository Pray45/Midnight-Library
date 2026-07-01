import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            default: "google-books",
        },

        sourceId: {
            type: String,
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
        },

        subtitle: String,

        authorIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Author",
            },
        ],

        cover: String,

        smallCover: String,

        description: String,

        genre: {
            type: String,
            default: "",
        },

        all_genres: {
            type: [String],
            default: [],
        },

        publishYear: Number,

        languages: {
            type: [String],
            default: [],
        },

        pageCount: Number,

        series: String,

        seriesPosition: Number,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Book", bookSchema);