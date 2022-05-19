const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

const createProduct = async (ProductData) => {
  return Product.create(ProductData);
};

const queryProducts = async (filter, options) => {
  const Products = await Product.paginate(
    filter,
    options,
    '-pictures.other_pictures -uploaded_by -description -updated_at -weight -stock'
  );
  return Products;
};

const getProductById = async (id) => {
  return Product.findById(id).populate({ path: 'uploaded_by', select: 'name email' });
};

const updateProductById = async (ProductId, updateBody) => {
  const item = await getProductById(ProductId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }

  Object.assign(item, updateBody);
  await item.save();
  return item;
};

const deleteProductById = async (ProductId) => {
  const item = await getProductById(ProductId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  await item.remove();
  return item;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
