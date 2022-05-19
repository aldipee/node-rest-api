const express = require('express');
const movieController = require('../../controllers/movie.controller');

const router = express.Router();

router.route('/').get(movieController.getMovies);
router.route('/:movieId').get(movieController.getMovie);

module.exports = router;
