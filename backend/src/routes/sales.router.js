const route = require('express').Router();

const { salesControllers } = require('../controllers');

route.get('/', salesControllers.findAllSales);
route.get('/:id', salesControllers.findSalesById);

module.exports = route;