const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuote = {
  body: Joi.object().keys({
    quote: Joi.string().required(),
    author: Joi.string().required(),
    author_avatar: Joi.string().optional(),
    author_link: Joi.string().optional(),
    language: Joi.string().optional(),
  }),
};

const getQuotes = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getQuote = {
  params: Joi.object().keys({
    quoteId: Joi.string().custom(objectId),
  }),
};

const updateQuote = {
  params: Joi.object().keys({
    quoteId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      quote: Joi.string().required(),
      author: Joi.string().required(),
      author_avatar: Joi.string().required(),
      author_link: Joi.string().required(),
    })
    .min(1),
};

const deleteQuote = {
  params: Joi.object().keys({
    quoteId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createQuote,
  getQuote,
  getQuotes,
  updateQuote,
  deleteQuote,
};
