const route = require('express').Router();

const salesControllers = require('../controllers/sales.controller');

route.get('/', salesControllers.getAll);
route.get('/:id', salesControllers.getById);
route.post('/', salesControllers.insertSales);

module.exports = route;