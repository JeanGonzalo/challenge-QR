const express = require('express')
const logger = require('../lib/logger');

const productsController = require('./products.controller');
const validateProduct = require('./products.validate');
const processError = require('../lib/errorHandler').processError;
const { ProductNotFound } = require('./products.error');

const productsRoutes = express.Router()

// READ
productsRoutes.get('/', processError(async (req, res) => {
  let products = await productsController.getProducts();
  logger.info('Se envió correctamente los productos', `total: ${products.length}`);
  res.json(products);
}));

// CREATE
productsRoutes.post('/', validateProduct, processError(async (req, res) => {
  const newProduct = req.body;
  await productsController.create(newProduct);

  res.json('Se creó correctamente el producto');
  logger.info('Se creó correctamente el producto: ', newProduct.id);
}));

// UPDATE
productsRoutes.put('/:id', validateProduct, processError(async (req, res) => {
  let product = await productsController.get(req.params.id);
  if (product === null) throw new ProductNotFound('El producto no existe.');
  await productsController.update(req.params.id, req.body)

  res.json('Se actualizó correctamente el producto.');
  logger.info('Se actualizó correctamente el producto.');
}));

// DESTROY
productsRoutes.delete('/:id', processError(async (req, res) => {
  let product = await productsController.get(req.params.id);
  if (product === null) throw new ProductNotFound('El producto no existe.');
  await productsController.remove(req.params.id)

  res.json('Se eliminó correctamente el producto.');
  logger.info('Se eliminó correctamente el producto.');
}));

module.exports = productsRoutes;
