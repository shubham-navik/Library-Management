const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isbn: {
      type: String,
      unique: true,
      required: [true, "ISBN is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: [true, "Published year is required"],
    },
    copiesAvailable: {
      type: Number,
      default: 1,
      min: [0, "Copies available cannot be negative"],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
 