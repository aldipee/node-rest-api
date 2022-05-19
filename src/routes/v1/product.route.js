const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('product'), validate(productValidation.createProduct), productController.createProduct)
  .get(auth('product'), validate(productValidation.getProduct), productController.getProducts);

router
  .route('/:productId')
  .get(auth('product'), validate(productValidation.getProductById), productController.getProductById)
  .patch(auth('product'), validate(productValidation.updateProduct), productController.updateProductById)
  .delete(auth('product'), validate(productValidation.deletePrduct), productController.deleteProductById);

module.exports = router;
