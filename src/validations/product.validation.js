const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    product_name: Joi.string().required(),
    product_category: Joi.string().required().valid('Sepatu Sport', 'Sepatu Bola', 'Sepatu Futsal'),
    price: Joi.number().required(),
    weight: Joi.number().required(),
    stock: Joi.required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    pictures: {
      main_pictures: Joi.string().required(),
      other_pictures: Joi.array().required(),
    },
    brand: Joi.required(),
  }),
};

const getProduct = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductById = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      product_name: Joi.string().required(),
      product_category: Joi.string().required().valid('Sepatu Sport', 'Sepatu Bola', 'Sepatu Futsal'),
      price: Joi.number().required(),
      weight: Joi.number().required(),
      stock: Joi.required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      pictures: {
        main_pictures: Joi.string().required(),
        other_pictures: Joi.array().required(),
      },
      brand: Joi.required(),
    })
    .min(1),
};

const deletePrduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deletePrduct,
};
