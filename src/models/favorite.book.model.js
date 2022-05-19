const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const favoriteBookSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    bookId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
favoriteBookSchema.plugin(toJSON);
favoriteBookSchema.plugin(paginate);

const FavoriteBook = mongoose.model('FavoriteBook', favoriteBookSchema);

module.exports = FavoriteBook;
