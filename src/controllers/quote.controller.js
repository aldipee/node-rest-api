const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { buildResponse } = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');
const { quoteService } = require('../services');

const createQuote = catchAsync(async (req, res) => {
  const category = await quoteService.createQuote(req.body);
  res.status(httpStatus.CREATED).send(buildResponse('Success create quote', category));
});

const getQuotes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await quoteService.queryQuotes(filter, options);
  res.send(buildResponse({ data: result, message: 'Success get quotes' }));
});

const getQuote = catchAsync(async (req, res) => {
  const quote = await quoteService.getQuoteById(req.params.quoteId);
  if (!quote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  res.send(quote);
});

const updateQuote = catchAsync(async (req, res) => {
  const quote = await quoteService.updateQuoteById(req.params.quoteId, req.body);
  res.send(quote);
});

const deleteQuote = catchAsync(async (req, res) => {
  await quoteService.deleteQuoteById(req.params.quoteId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
};
