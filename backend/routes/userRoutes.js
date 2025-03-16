const express = require("express");
const router = express.Router();
const { registerUser, loginUser,logoutUser, getUserProfile, updateUserProfile, deleteUser,getAllRequestedBooks } = require("../controller/userController");
const { authMiddleware, adminMiddleware } = require("../middleware/authmiddleware");

router.post("/register", registerUser);// Register a new user
router.post("/login", loginUser);// Login user
router.get("/logout",authMiddleware,logoutUser);// Logout user
router.get("/profile/:id",authMiddleware,getUserProfile);// Get user profile
router.put("/profile/:id",authMiddleware, updateUserProfile);// Update user profile
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);// Delete a user by ID
router.get("/getallrequestedbooks", authMiddleware, getAllRequestedBooks);// Get all requested books by user


module.exports = router;