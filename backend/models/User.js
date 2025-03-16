const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    /** 🔹 Books requested by user to admin */
    bookRequests: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "denied"],
          default: "pending"
        },
        requestedAt: {
          type: Date,
          default: Date.now
        },
        responseAt: {
          type: Date
        }
      }
    ],

    /** 🔹 Books granted to user by admin */
    issuedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true
        },
        issuedAt: {
          type: Date,
          default: Date.now
        },
        dueDate: {
          type: Date,
          required: true
        },
        returned: {
          type: Boolean,
          default: false
        }
      }
    ],

    /** 🔹 Requests received by admin from users */
    receivedRequests: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "denied"],
          default: "pending"
        },
        requestedAt: {
          type: Date,
          default: Date.now
        },
        responseAt: {
          type: Date
        }
      }
    ],

    /** 🔹 Books granted by admin to users */
    issuedBooksByAdmin: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true
        },
        issuedAt: {
          type: Date,
          default: Date.now
        },
        dueDate: {
          type: Date,
          required: true
        },
        returned: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
