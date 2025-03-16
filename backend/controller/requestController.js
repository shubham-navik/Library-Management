const Book = require("../models/Book");
const User = require("../models/User");

/** 🔹 User Requests a Book */
exports.requestBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id; // Get user ID from token

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Find the admin who added this book
    const admin = await User.findById(book.addedBy);
    if (!admin || admin.role !== "admin") {
      return res.status(400).json({ message: "Admin who added this book not found" });
    }

    // Check if user already requested the book
    const user = await User.findById(userId);
    const existingRequest = user.bookRequests.find(req => req.bookId.toString() === bookId);
    if (existingRequest) {
      return res.status(400).json({ message: "Book already requested" });
    }

    // Add request to user's bookRequests
    user.bookRequests.push({ bookId, status: "pending" });
    await user.save();

    // Add request to the specific admin who added this book
    admin.receivedRequests.push({ userId, bookId, status: "pending" });
    await admin.save();

    res.status(201).json({ message: "Book request sent successfully to the admin who added this book" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


/** 🔹 Admin Approves/Deny Book Request */
exports.handleBookRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body; // Status: "accepted" or "denied"
    if (!["accepted", "denied"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const admin = await User.findById(req.user.id);
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Only admins can approve/deny requests" });
    }

    // Find the request in admin's receivedRequests
    const request = admin.receivedRequests.find(req => req._id.toString() === requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update the request status
    request.status = status;
    request.responseAt = new Date();
    await admin.save();

    // Update the request status in user's bookRequests
    const user = await User.findById(request.userId);
    const userRequest = user.bookRequests.find(req => req.bookId.toString() === request.bookId.toString());
    if (userRequest) {
      userRequest.status = status;
      userRequest.responseAt = new Date();
      await user.save();
    }

    res.json({ message: `Book request ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/** 🔹 Admin Issues a Book */
exports.issueBook = async (req, res) => {
  try {
    const { userId, bookId, dueDate } = req.body;

    const admin = await User.findById(req.user.id);
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Only admins can issue books" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add to user's issuedBooks
    user.issuedBooks.push({ bookId, dueDate });
    await user.save();

    // Add to admin's issuedBooksByAdmin
    admin.issuedBooksByAdmin.push({ userId, bookId, dueDate });
    await admin.save();

    res.status(201).json({ message: "Book issued successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/** 🔹 Get All Requests (Admin Only) */
exports.getAllRequestsToAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Only admins can view all requests" });
    }

    res.json({ requests: admin.receivedRequests });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get all requested books by user 
exports.getAllRequestedBooksByUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("bookRequests.bookId");
        if (!user) return res.status(404).json({ message: "User not found" });
         return res.json(user.bookRequests);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }       
}
