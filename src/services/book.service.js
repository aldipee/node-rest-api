const httpStatus = require('http-status');
const { Book, FavoriteBook } = require('../models');
const ApiError = require('../utils/ApiError');

const createBook = async (BookData) => {
  return Book.create(BookData);
};

const createFavoriteBook = async (favoriteBookData) => {
  return FavoriteBook.create(favoriteBookData);
};

const getBooksFavorite = async (userId) => {
  const BookItems = await FavoriteBook.find({ userId }).populate({ path: 'bookId' });
  return BookItems;
};

const queryBookItems = async (filter, options) => {
  const BookItems = await Book.paginate(filter, options, '-synopsis -stock_available -total_sale -page_count');
  return BookItems;
};

const getBookItemById = async (id) => {
  return Book.findById(id);
};

const updateBookItemById = async (BookId, updateBody) => {
  const item = await getBookItemById(BookId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }

  Object.assign(item, updateBody);
  await item.save();
  return item;
};

const deleteBookItemById = async (BookId) => {
  const item = await getBookItemById(BookId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  await item.remove();
  return item;
};

module.exports = {
  createBook,
  queryBookItems,
  getBookItemById,
  updateBookItemById,
  deleteBookItemById,
  createFavoriteBook,
  getBooksFavorite,
};
