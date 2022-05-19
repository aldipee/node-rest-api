const Joi = require('joi');

const parserNIK = {
  body: Joi.object().keys({
    nik: Joi.string().required().length(16),
  }),
};

module.exports = {
  parserNIK,
};
