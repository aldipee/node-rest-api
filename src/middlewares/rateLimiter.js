const httpStatus = require('http-status');
const rateLimit = require('express-rate-limit');
const { buildResponse } = require('../utils/ApiResponse');

const authLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
});

const requestLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 50,
  handler: (req, res) => {
    res.status(httpStatus.TOO_MANY_REQUESTS).send(
      buildResponse({
        message: 'Too many request created from this IP, please try again after 5 minutes',
        error_code: httpStatus['429'].toUpperCase().replace(/\s/g, '-'),
      })
    );
  },
});

module.exports = {
  authLimiter,
  requestLimiter,
};
