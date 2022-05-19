const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  req.body.uploaded_by = req.user.id;
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  result.results = result.results.map((itemProduct) => {
    // eslint-disable-next-line no-param-reassign
    delete itemProduct.pictures.other_pictures;
    return itemProduct;
  });

  res.send(result);
});

const getProductById = catchAsync(async (req, res) => {
  const item = await productService.getProductById(req.params.productId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }

  res.send(item);
});

const updateProductById = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProductById = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.send({ message: 'Product deleted', id: req.params.productId });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
