const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const streamingSchema = mongoose.Schema(
  {
    is_series: {
      type: 'Boolean',
      required: true,
      default: false,
    },
    slug: {
      type: String,
      require: true,
    },
    status_data: {
      type: 'String',
      enum: ['FETCHING_COMPLETED', 'FETCHING_FAILED', 'NOT_FETCHING'],
      default: 'NOT_FETCHING',
    },
    media: {
      required: true,
      type: ['Mixed'],
    },
    vote_average: {
      type: String,
      trim: true,
      default: 'NOT_AVAILABLE',
    },
    id_tmdb: {
      type: 'String',
      trim: true,
      default: 'NOT_AVAILABLE',
    },
    movie_title: {
      type: 'String',
      required: true,
      trim: true,
    },
    movie_cover_image: {
      type: 'String',
      required: true,
      trim: true,
    },
    movie_poster: {
      type: 'String',

      trim: true,
      default: 'NOT_AVAILABLE',
    },
    movie_main_category: {
      type: 'String',
      required: true,
      trim: true,
    },
    movie_year: {
      type: 'String',
      required: true,
      trim: true,
    },
    meta_data: {
      adult: {
        type: 'Boolean',
        trim: true,
        default: false,
      },
      backdrop_path: {
        type: 'String',
      },
      belongs_to_collection: {
        id: {
          type: 'Number',
        },
        name: {
          type: 'String',
        },
        poster_path: {
          type: 'String',
        },
        backdrop_path: {
          type: 'String',
        },
      },
      budget: {
        type: 'Number',
      },
      genres: {
        type: ['Mixed'],
      },
      homepage: {
        type: 'String',
      },
      id: {
        type: 'Number',
      },
      imdb_id: {
        type: 'String',
      },
      original_language: {
        type: 'String',
      },
      original_title: {
        type: 'String',
      },
      overview: {
        type: 'String',
      },
      popularity: {
        type: 'Number',
      },
      poster_path: {
        type: 'String',
      },
      production_companies: {
        type: ['Mixed'],
      },
      production_countries: {
        type: ['Mixed'],
      },
      release_date: {
        type: 'String',
      },
      revenue: {
        type: 'Number',
      },
      runtime: {
        type: 'Number',
      },
      spoken_languages: {
        type: ['Mixed'],
      },
      status: {
        type: 'String',
      },
      tagline: {
        type: 'String',
      },
      title: {
        type: 'String',
      },
      video: {
        type: 'Boolean',
      },
      vote_average: {
        type: 'Number',
      },
      vote_count: {
        type: 'Number',
      },
      credits: {
        cast: {
          type: ['Mixed'],
        },
        crew: {
          type: ['Mixed'],
        },
      },
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
streamingSchema.plugin(toJSON);
streamingSchema.plugin(paginate);

const Streaming = mongoose.model('Streaming', streamingSchema);

module.exports = Streaming;
