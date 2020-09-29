const express = require('express');
const routes = express.Router();
const loginController = require('../controllers/login');

routes.get('/login', loginController.getLoginPage);

routes.post('/login', loginController.postLogin)

routes.get('/register', loginController.registerPage)

routes.post('/register', loginController.postadd_User)

module.exports = routes;