const express = require('express');
const routes = express.Router();

const dashboardController = require('../controllers/dashboard')
const storesController = require('../controllers/stores')
const auth = require('../utils/auth');

routes.get('/', auth.isUserLoggedIn, dashboardController.getDashboardPage)

routes.get('/logout', auth.isUserLoggedIn, dashboardController.getLogOut)

routes.get('/users', auth.isUserLoggedIn, dashboardController.getUsers)

routes.get('/users/data', auth.isUserLoggedIn, dashboardController.getUsersData)

routes.post('/users/add', auth.isUserLoggedIn, dashboardController.postAddUser)

routes.get('/users/delete', auth.isUserLoggedIn, dashboardController.getDeleteUser)

routes.get('/stores', auth.isUserLoggedIn, storesController.getStoresPage)

routes.get('/stores/data', auth.isUserLoggedIn, storesController.getStoresData)

routes.post('/stores/add', auth.isUserLoggedIn, storesController.postAddStore)

routes.get('/stores/delete', auth.isUserLoggedIn, storesController.getDeleteStore)

module.exports = routes;