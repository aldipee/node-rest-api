const express = require('express');
const validate = require('../../middlewares/validate');
const quoteValidation = require('../../validations/quote.validation');
const quoteController = require('../../controllers/quote.controller');

const router = express.Router();

router.route('/').post(validate(quoteValidation.createQuote), quoteController.createQuote).get(quoteController.getQuotes);

router
  .route('/:quoteId')
  .get(validate(quoteValidation.getQuote), quoteController.getQuote)
  .patch(validate(quoteValidation.updateQuote), quoteController.updateQuote)
  .delete(validate(quoteController.deleteQuote), quoteController.deleteQuote);

module.exports = router;
