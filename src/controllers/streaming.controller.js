/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
const httpStatus = require('http-status');
const axios = require('axios');
const slugify = require('slugify');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const dataMovie = require('../../data/movie-50-100.json');
const { streamingService } = require('../services');

const createStreamingImport = catchAsync(async (req, res) => {
  // eslint-disable-next-line array-callback-return
  dataMovie.Sheet1.map((streamingData, index) => {
    try {
      setTimeout(async () => {
        let number = 1;
        const bodyData = {
          movie_title: streamingData.movie_title,
          movie_cover_image: streamingData['movie_cover_image-src'],
          movie_main_category: streamingData.movie_cat,
          slug: slugify(streamingData.movie_title, { lower: true }),
          movie_year: streamingData.movie_year,
          media: [
            {
              media_name: 'Default Server',
              media_link: streamingData.movile_link,
              media_subtitle: streamingData.movie_subtitle === 'null' ? null : streamingData.movie_subtitle,
            },
          ],
        };

        const movie = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf&query=${encodeURI(
            streamingData.movie_title
          )}`
        );
        if (movie.data.results.length) {
          const { id } = movie.data.results[0];
          const detailData = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=f7b67d9afdb3c971d4419fa4cb667fbf&append_to_response=credits`
          );
          bodyData.meta_data = detailData.data;
          bodyData.movie_poster = detailData.data.poster_path;
          bodyData.vote_average = detailData.data.vote_average;
          bodyData.id_tmdb = detailData.data.id;
          bodyData.status_data = 'FETCHING_COMPLETED';
        }

        const response = await streamingService.createStreamingImport(bodyData);
        number++;
        console.log(`Inserting data ke ${index} ${streamingData.movie_title}`);
      }, index * 600);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  });

  res.status(httpStatus.CREATED);
});
// const createBookFavorite = catchAsync(async (req, res) => {
//   const body = { ...req.body, userId: req.user.id };
//   const user = await bookService.createFavoriteBook(body);
//   res.status(httpStatus.CREATED).send(user);
// });

// const getBookFavorite = catchAsync(async (req, res) => {
//   const result = await bookService.getBooksFavorite(req.user.id);
//   const mainResult = result.length ? result.map((item) => ({ ...item.bookId._doc, saved_time: item.created_at })) : [];
//   res.send(mainResult);
// });

// const getBookItems = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['title', 'role']);
//   if (filter.title) {
//     filter.title = { $regex: filter.title };
//   }
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await bookService.queryBookItems(filter, options);
//   res.send(result);
// });

// const getBookItemById = catchAsync(async (req, res) => {
//   const item = await bookService.getBookItemById(req.params.bookId);
//   if (!item) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
//   }
//   res.send(item);
// });

// const updateBookItemById = catchAsync(async (req, res) => {
//   const user = await bookService.updateBookItemById(req.params.bookId, req.body);
//   res.send(user);
// });

// const deleteBookItem = catchAsync(async (req, res) => {
//   await bookService.deleteBookItemById(req.params.bookId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createStreamingImport,
};
