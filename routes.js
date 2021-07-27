const express = require('express'); // Requisitando express(Servidor web)
const route = express.Router(); //Essa constante vai ser o "Router"
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


//Rotas da home
route.get('/', homeController.index);

//Rotas de Login
route.get('/login/logout', loginController.logout);
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);

module.exports = route; 