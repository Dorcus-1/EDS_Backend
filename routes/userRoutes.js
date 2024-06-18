const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/userController");
const {
  createBook,
  getAllBooks,
  getBookById,
  deleteBookById,
  updateBookById
} = require("../controllers/bookController");

// Importing auth as a default import
const auth = require("../controllers/auth");

router.post("/user/create", createUser); // Add leading slash '/'
router.post("/user/login", loginUser); // Add leading slash '/'
router.post("/create/book", auth, createBook);
router.get("/all/books", auth, getAllBooks);
router.get("/:id/books", auth, getBookById);
router.delete("/delete/book/:id", auth, deleteBookById);
// router.patch("/book/:id", auth, updatebookById);

module.exports.userRoutes = router;
