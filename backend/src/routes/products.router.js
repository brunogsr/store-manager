const route = require('express').Router();

const productsControllers = require('../controllers/products.controller');

route.get('/', productsControllers.getAll);
route.get('/:id', productsControllers.getById);
route.post('/', productsControllers.insertProduct);

module.exports = route;
