const httpStatus = require('http-status');
const nikParser = require('../utils/nikParser');
const { buildResponse } = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');

const extractDataFromNik = catchAsync(async (req, res) => {
  nikParser(req.body.nik, (data) => {
    if (data.status === 'error') {
      res
        .status(httpStatus.BAD_REQUEST)
        .send(buildResponse({ error_code: 'INVALID_NIK', message: 'Your NIK number is invalid', data: data.data }));
    }

    res.status(httpStatus.CREATED).send(buildResponse({ message: 'Success parser NIK', data: data.data }));
  });
});

module.exports = {
  extractDataFromNik,
};
