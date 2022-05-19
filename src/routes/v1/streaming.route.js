const express = require('express');
const streamingController = require('../../controllers/streaming.controller');

const router = express.Router();

router.route('/migration').get(streamingController.createStreamingImport);

module.exports = router;
