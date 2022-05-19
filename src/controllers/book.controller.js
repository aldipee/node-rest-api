const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');

const createBookItem = catchAsync(async (req, res) => {
  const user = await bookService.createBook(req.body);
  res.status(httpStatus.CREATED).send(user);
});
const createBookFavorite = catchAsync(async (req, res) => {
  const item = await bookService.getBookItemById(req.body.bookId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'BookIdnot found');
  }
  const body = { ...req.body, userId: req.user.id };
  const user = await bookService.createFavoriteBook(body);
  res.status(httpStatus.CREATED).send(user);
});

const getBookFavorite = catchAsync(async (req, res) => {
  const result = await bookService.getBooksFavorite(req.user.id);
  const mainResult = result.length ? result.map((item) => ({ ...item.bookId._doc, saved_time: item.created_at })) : [];
  res.send(mainResult);
});

const getBookItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'role']);
  if (filter.title) {
    filter.title = { $regex: filter.title };
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bookService.queryBookItems(filter, options);
  res.send(result);
});

const getBookItemById = catchAsync(async (req, res) => {
  const item = await bookService.getBookItemById(req.params.bookId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  res.send(item);
});

const updateBookItemById = catchAsync(async (req, res) => {
  const user = await bookService.updateBookItemById(req.params.bookId, req.body);
  res.send(user);
});

const deleteBookItem = catchAsync(async (req, res) => {
  await bookService.deleteBookItemById(req.params.bookId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBookItem,
  getBookItems,
  getBookItemById,
  updateBookItemById,
  deleteBookItem,
  createBookFavorite,
  getBookFavorite,
};
