import mongoose, { InferSchemaType, Schema } from "mongoose";

const openBookSchema = new Schema(
  {
    workId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      index: true,
    },

    normalizedTitle: {
      type: String,
      required: true,
      index: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    authors: [
      {
        authorId: {
          type: Schema.Types.ObjectId,
          ref: "OpenAuthor",
        },

        openLibraryId: String,

        name: String,
      },
    ],

    covers: {
      type: [Number],
      default: [],
    },

    subjects: {
      type: [String],
      default: [],
    },

    subjectPlaces: {
      type: [String],
      default: [],
    },

    subjectPeople: {
      type: [String],
      default: [],
    },

    subjectTimes: {
      type: [String],
      default: [],
    },

    firstPublishYear: Number,

    languages: {
      type: [String],
      default: [],
    },

    links: {
      type: [String],
      default: [],
    },

    excerpts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

openBookSchema.index({
    title: "text",
    subjects: "text",
});

export default mongoose.model("OpenBook", openBookSchema);