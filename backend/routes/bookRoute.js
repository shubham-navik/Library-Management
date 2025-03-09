const express = require("express");
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require("../controller/bookController");
const {authMiddleware,adminMiddleware} = require("../middleware/authmiddleware");

const router = express.Router();

// Routes for book operations
router.post("/addbook",authMiddleware,adminMiddleware, addBook);       // Add a new book
router.get("/getbooks",authMiddleware, getBooks);       // Get all books
router.get("/:id",authMiddleware, getBookById); // Get a single book by ID
router.put("/:id",authMiddleware,adminMiddleware, updateBook);  // Update a book by ID
router.delete("/:id",authMiddleware,adminMiddleware, deleteBook); // Delete a book by ID

module.exports = router;
