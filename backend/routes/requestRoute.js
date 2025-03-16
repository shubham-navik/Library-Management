const express = require('express');
const router = express.Router();
const {requestBook,handleBookRequest,issueBook,getAllRequestsToAdmin,getAllRequestedBooksByUser} = require('../controller/requestController');
const { authMiddleware, adminMiddleware } = require('../middleware/authmiddleware');

router.post("/requestbook",authMiddleware,requestBook);// Request a book
router.post("/handlebookrequest", authMiddleware, adminMiddleware, handleBookRequest);// Admin approves/denies book request
router.post("/issuebook", authMiddleware, adminMiddleware, issueBook);// Admin issues a book to user
router.get("/getallrequests", authMiddleware, adminMiddleware, getAllRequestsToAdmin);// Get all requests (admin only)
router.get("/getallrequestedbooks", authMiddleware, getAllRequestedBooksByUser);// Get all requested books by user

module.exports = router;


