const express = require('express');
const validate = require('../../middlewares/validate');
const toolsValidation = require('../../validations/tools.validation');
const toolsController = require('../../controllers/tools.controller');

const router = express.Router();

router.route('/nik-parser').post(validate(toolsValidation.parserNIK), toolsController.extractDataFromNik);

module.exports = router;
