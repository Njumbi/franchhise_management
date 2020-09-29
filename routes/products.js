const express = require('express');
const routes = express.Router();
const auth = require('../utils/auth');

const productsController = require('../controllers/products');

routes.get('/products', auth.isUserLoggedIn, productsController.getProductsPage)

routes.get('/products/data', auth.isUserLoggedIn, productsController.getProductsData)

routes.post('/products/add', auth.isUserLoggedIn, productsController.postAddProducts)

module.exports = routes;