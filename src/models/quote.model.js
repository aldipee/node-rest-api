const { mongoose } = require('../utils/redisClient');
const { toJSON, paginate } = require('./plugins');

const quoteSchema = mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    author_avatar: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    language: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    author_link: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
quoteSchema.plugin(toJSON);
quoteSchema.plugin(paginate);

/**
 * @typedef Quote
 */
const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
