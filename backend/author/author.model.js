import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        normalizedName: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        bio: String,

        photo: String,

        bookCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Author", authorSchema);