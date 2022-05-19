const axios = require('axios');
const { streamingService } = require('../services');
const dataMovie = require('../../data/data.test.json');

dataMovie.Sheet1.map(async (streamingData) => {
  try {
    const bodyData = {
      movie_title: streamingData.movie_title,
      movie_cover_image: streamingData['movie_cover_image-src'],
      movie_main_category: streamingData.movie_cat,
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
      'https://api.themoviedb.org/3/search/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf&query=Toy%20Story'
    );
    if (movie.data.results.length) {
      const { id } = movie.data.results[0];
      const detailData = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=f7b67d9afdb3c971d4419fa4cb667fbf&append_to_response=credits`
      );
      bodyData.meta_data = detailData.data;
      bodyData.status_data = 'FETCHING_COMPLETED';
    }

    await streamingService.createStreamingImport(bodyData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});
