// const httpStatus = require('http-status');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

const getMovies = catchAsync(async (req, res) => {
  const result = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf');
  result.data.results = result.data.results.map((movie) => ({
    ...movie,
    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
  }));
  res.send(result.data);
});

const getMovie = catchAsync(async (req, res) => {
  const movie = await axios.get(
    `https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=f7b67d9afdb3c971d4419fa4cb667fbf&append_to_response=credits`
  );
  movie.data.poster_path = `https://image.tmdb.org/t/p/w500${movie.data.poster_path}`;
  movie.data.backdrop_path = `https://image.tmdb.org/t/p/w500${movie.data.backdrop_path}`;
  //   if (!movie) {
  //     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  //   }
  movie.data.credits.cast = movie.data.credits.cast.length
    ? movie.data.credits.cast.map((item) => ({
        ...item,
        profile_path: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
      }))
    : [];
  delete movie.data.credits.crew;
  res.send(movie.data);
});

module.exports = {
  getMovies,
  getMovie,
};
