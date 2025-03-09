const express = require("express");
const { getAllusers, getAllAdmins,deleteUser } = require("../controller/adminController");
const router = express.Router();

router.get("/users", getAllusers);       // Get all users
router.get("/admins", getAllAdmins);       // Get all admins
router.delete("/delete/:id", deleteUser); // Delete a user by ID

module.exports = router;