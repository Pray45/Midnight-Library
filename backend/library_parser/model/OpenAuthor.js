import mongoose, { Schema } from "mongoose";

const openAuthorSchema = new Schema(
  {
    openLibraryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      index: true,
    },

    normalizedName: {
      type: String,
      required: true,
      index: true,
    },

    bio: {
      type: String,
      default: "",
    },

    birthDate: {
      type: String,
      default: "",
    },

    deathDate: {
      type: String,
      default: "",
    },

    photos: {
      type: [Number],
      default: [],
    },

    alternateNames: {
      type: [String],
      default: [],
    },

    wikipedia: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    topWork: {
      type: String,
      default: "",
    },

    workCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

openAuthorSchema.index({
    name: "text",
    alternateNames: "text",
});

export default mongoose.model("OpenAuthor", openAuthorSchema);