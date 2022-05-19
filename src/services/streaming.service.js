// const httpStatus = require('http-status');
const { Streaming } = require('../models');
// const ApiError = require('../utils/ApiError');

const createStreamingImport = async (streamingData) => {
  return Streaming.create(streamingData);
};

// const createBook = async (BookData) => {
//     return Streaming.create(BookData);
//   };

// const getBooksFavorite = async (userId) => {
//   const BookItems = await FavoriteBook.find({ userId }).populate({ path: 'bookId' });
//   return BookItems;
// };

// const queryBookItems = async (filter, options) => {
//   const BookItems = await Book.paginate(filter, options, '-synopsis -stock_available -total_sale -page_count');
//   return BookItems;
// };

// const getBookItemById = async (id) => {
//   return Book.findById(id);
// };

// const updateBookItemById = async (BookId, updateBody) => {
//   const item = await getBookItemById(BookId);
//   if (!item) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
//   }

//   Object.assign(item, updateBody);
//   await item.save();
//   return item;
// };

// const deleteBookItemById = async (BookId) => {
//   const item = await getBookItemById(BookId);
//   if (!item) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
//   }
//   await item.remove();
//   return item;
// };

module.exports = {
  createStreamingImport,
};
