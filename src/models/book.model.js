const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookSchema = mongoose.Schema(
  {
    title: {
      type: 'String',
      required: true,
      trim: true,
    },
    author: {
      type: 'String',
      required: true,
      trim: true,
    },
    cover_image: {
      type: 'String',
      required: true,
      trim: true,
    },
    id: {
      type: 'String',
      required: true,
      trim: true,
      unique: true,
    },
    page_count: {
      type: 'String',
      required: true,
      trim: true,
    },
    publisher: {
      type: 'String',
      required: true,
      trim: true,
    },
    synopsis: {
      type: 'String',
      required: true,
      trim: true,
    },
    total_sale: {
      type: 'String',
      required: true,
      trim: true,
    },
    average_rating: {
      type: 'String',
      required: true,
      trim: true,
    },
    price: {
      type: 'String',
      required: true,
      trim: true,
    },
    stock_available: {
      type: 'String',
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
bookSchema.plugin(toJSON);
bookSchema.plugin(paginate);

/**
 * @typedef User
 */
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
