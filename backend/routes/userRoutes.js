const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } = require("../controller/userController");
// const { protect } = require("../middleware/authmiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id",getUserProfile);
router.put("/profile/:id", updateUserProfile);
router.delete("/:id", deleteUser);


module.exports = router;