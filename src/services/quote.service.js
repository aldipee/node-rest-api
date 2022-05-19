const httpStatus = require('http-status');
const { clearKey } = require('../utils/redisClient');
const { Quote } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new quote
 * @param {Object} quoteBody
 * @returns {Promise<Quote>}
 */
const createQuote = async (quoteBody) => {
  const quote = await Quote.create(quoteBody);
  clearKey(Quote.collection.collectionName);
  return quote;
};

/**
 * Query for quotes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuotes = async (filter, options) => {
  const quotes = await Quote.paginate(filter, options, '', true);
  return quotes;
};

/**
 * Get quote by Id
 * @param {ObjectId} id
 * @returns {Promise<Quote>}
 */
const getQuoteById = async (id) => {
  return Quote.findById(id);
};

/**
 * Update quote by ID
 * @param {ObjectId} quoteId
 * @param {Object} updateBody
 * @returns {Promise<Quote>}
 */
const updateQuoteById = async (quoteId, updateBody) => {
  const quote = await getQuoteById(quoteId);
  if (!quote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  Object.assign(quote, updateBody);
  await quote.save();
  clearKey(Quote.collection.collectionName);
  return quote;
};

/**
 * Delete quote by ID
 * @param {ObjectId} quoteId
 * @returns {Promise<Quote>}
 */
const deleteQuoteById = async (quotedId) => {
  const quote = await getQuoteById(quotedId);
  if (!quote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quote not found');
  }
  await quote.remove();
  clearKey(Quote.collection.collectionName);
  return quote;
};

module.exports = {
  createQuote,
  getQuoteById,
  queryQuotes,
  updateQuoteById,
  deleteQuoteById,
};
