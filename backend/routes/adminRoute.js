const express = require("express");
const { getAllusers, getAllAdmins,deleteUser,getAllBooksByAdmin } = require("../controller/adminController");
const { authMiddleware, adminMiddleware } = require("../middleware/authmiddleware");
const router = express.Router();

router.get("/users",authMiddleware, adminMiddleware,getAllusers);       // Get all users
router.get("/admins",authMiddleware,adminMiddleware, getAllAdmins);       // Get all admins
router.delete("/delete/:id",authMiddleware,adminMiddleware, deleteUser); // Delete a user by ID
router.get("/books/:id",authMiddleware,adminMiddleware, getAllBooksByAdmin); // Get all books by admin ID

module.exports = router;