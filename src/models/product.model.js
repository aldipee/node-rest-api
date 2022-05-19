const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: 'String',
    },
    product_category: {
      type: 'String',
    },
    price: {
      type: 'Number',
    },
    stock: {
      size: {
        type: ['Mixed'],
      },
    },
    slug: {
      type: 'String',
    },
    description: {
      type: 'String',
    },
    brand: {
      type: ['Mixed'],
    },
    weight: {
      type: 'Number',
    },
    type: {
      type: 'String',
    },
    pictures: {
      main_pictures: {
        type: 'String',
      },
      other_pictures: {
        type: 'Array',
      },
    },
    uploaded_by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
