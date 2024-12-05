const express = require("express");
const {books} = require("../data/books.json");

const BookModel = require("../models/book-model")
const UserModel = require("../models/user-model")

//  Instead of doing it two times you can do like this 

const {BookModel , UserModel} = require("../models");
const { getAllBooks, getSingleBookById, addNewBook, updateBookbyId } = require("../controllers/book-controller");


// Creating a Router
const router = express.Router();

/**  -> API  Plan Structure  examples :- postman or Insomania 
 
 * Route : /books
 * Method : GET
 * Description : Get all books 
 * Access : Public
 * Parameters : none  ex :- /books/para
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});



router.get("/", getAllBooks)





/**
 
 * Route : /books/:id
 * Method : GET
 * Description : Get book by their id 
 * Access : Public
 * Parameters : id
 
 */

router.get("/:id", (req, res) => {
  const { id } = req.params; //parameters :- params
  const book = books.find((each) => each.id == id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "books not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: book,
  });
});


router.get("/:id", getSingleBookById)

/**
 
 * Route : /books
 * Method : Post
 * Description : Create a new book 
 * Access : Public
 * Parameters : None
 
 */

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const book = users.find((each) => each.id == id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "User exists with the given id",
    });
  }

  books.push({ id, name, surname, email, subscriptionType, subscriptionDate });
  return res.status(201).json({
    success: true,
    data: books,
  });
});


router.post("/" , addNewBook)

/**  -> PUT is used to update 
 
 * Route : /books
 * Method : GET
 * Description : Update a book by their Id 
 * Access : Public
 * Parameters : None
 
 */

router.put("/:id", updateBookbyId)




/**  -> How to work with Delete 
 
 * Route : /books/:id
 * Method : DELETE
 * Description : Deleting a book by their id 
 * Access : Public
 * Parameters : id
 
 */


router.delete("/:id", (req, res) => {
  const {id} = req.params;

  const book = books.find((each) => each.id == id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "User not found for the given id to delete here",
    });
  }

  const index = books.indexOf(book);
  books.slice(index, 1);

  return res.status(200).json({
    success: true,
    data: book,
  });
});

module.exports = router;


