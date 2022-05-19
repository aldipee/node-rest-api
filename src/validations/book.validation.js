const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBook = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    cover_image: Joi.string().required(),
    page_count: Joi.string().required(),
    publisher: Joi.string().required(),
    synopsis: Joi.string().required(),
    total_sale: Joi.string().required(),
    average_rating: Joi.string().required(),
    price: Joi.string().required(),
    stock_available: Joi.string().required(),
  }),
};

const getBookItems = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBookById = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

const updateBookItem = {
  params: Joi.object().keys({
    bookId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      author: Joi.string(),
      cover_image: Joi.string(),
      page_count: Joi.string(),
      publisher: Joi.string(),
      synopsis: Joi.string(),
      total_sale: Joi.string(),
      average_rating: Joi.string(),
      price: Joi.string(),
      stock_available: Joi.string(),
    })
    .min(1),
};

const createBookFavorite = {
  body: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

const deleteBookItem = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBook,
  getBookItems,
  getBookById,
  updateBookItem,
  deleteBookItem,
  createBookFavorite,
};
