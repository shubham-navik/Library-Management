const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password,role} = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: `${role}`+" already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({ name, email, password: hashedPassword,role });
        await user.save();

        res.status(201).json({ message:`${role}`+ " registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials (user not exist)" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials (incorrect password)" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//log out user
exports.logoutUser = (req, res) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];  // Extract token
    blacklist.add(token);  // Add token to blacklist
    res.json({ message: "Logged out successfully" });
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password").populate("requestedBooks.bookId issuedBooks.bookId");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
