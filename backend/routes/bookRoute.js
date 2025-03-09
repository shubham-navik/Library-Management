const express = require("express");
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require("../controller/bookController");

const router = express.Router();

// Routes for book operations
router.post("/", addBook);       // Add a new book
router.get("/", getBooks);       // Get all books
router.get("/:id", getBookById); // Get a single book by ID
router.put("/:id", updateBook);  // Update a book by ID
router.delete("/:id", deleteBook); // Delete a book by ID

module.exports = router;
