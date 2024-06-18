const { Op } = require("sequelize");
const Book = require("../models/bookModel");
const { validate } = require("../utils/bookValidations");

exports.createBook = async (req, res) => {
  const { error } = validate(req.body); // Validate the incoming request body
  if (error) {
    return res.status(400).send(error.details[0].message); // Send a 400 response if validation fails
  }
 
  try {
    const book = await Book.create({
      name: req.body.name,
      author: req.body.author,
      publisher: req.body.publisher,
      publicationYear: req.body.publicationYear,
      subject: req.body.subject,
    });
    console.log("here");
    res.status(201).send(book); // Send a 201 response with the created book
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the book"); // Send a 500 response if an error occurs
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll(); // Fetch all books from the database
    res.status(200).send(books); // Send a 200 response with the fetched books
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching books"); // Send a 500 response if an error occurs
  }
};

exports.getBookById = async (req, res) => {
  const bookId = req.params.id; // Get the book ID from the request parameters

  try {
    const book = await Book.findByPk(bookId); // Find the book by primary key
    if (!book) {
      return res.status(404).send("book not found"); // Send a 404 response if the book is not found
    }
    res.status(200).send(book); // Send a 200 response with the found book
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the book"); // Send a 500 response if an error occurs
  }
};

exports.deleteBookById = async (req, res) => {
  console.log("here in delete");
  const bookId = req.params.id; // Get the book ID from the request parameters

  try {
    const result = await Book.destroy({ where: { id: bookId } }); // Delete the book by ID
    if (!result) {
      return res.status(404).send("book not found"); // Send a 404 response if the book is not found
    }
    res.status(200).send("book deleted successfully"); // Send a 200 response if the book is deleted successfully
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the book"); // Send a 500 response if an error occurs
  }
};
