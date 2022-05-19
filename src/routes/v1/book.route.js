const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bookValidation = require('../../validations/book.validation');
const bookController = require('../../controllers/book.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('product'), validate(bookValidation.createBook), bookController.createBookItem)
  .get(auth('product'), bookController.getBookItems);

router
  .route('/my-favorite')
  .post(auth('product'), validate(bookValidation.createBookFavorite), bookController.createBookFavorite)
  .get(auth('product'), bookController.getBookFavorite);

router
  .route('/:bookId')
  .get(auth('product'), validate(bookValidation.getBookById), bookController.getBookItemById)
  .patch(auth('product'), validate(bookValidation.updateBookItem), bookController.updateBookItemById)
  .delete(auth('product'), validate(bookValidation.deleteBookItem), bookController.deleteBookItem);

module.exports = router;
