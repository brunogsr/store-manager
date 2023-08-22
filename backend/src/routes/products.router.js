const route = require('express').Router();

const { productsControllers } = require('../controllers');

route.get('/', productsControllers.getAll);
route.get('/:id', productsControllers.findById);

module.exports = route;