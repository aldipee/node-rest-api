const express = require('express');
const movieController = require('../../controllers/movie.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').get(auth('product'), movieController.getMovies);
router.route('/:movieId').get(auth('product'), movieController.getMovie);

module.exports = router;
