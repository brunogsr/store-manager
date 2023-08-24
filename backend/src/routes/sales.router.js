const route = require('express').Router();

const salesControllers = require('../controllers/sales.controller');
const { validadeSales } = require('../middlewares/sales.middlewares');

route.get('/', salesControllers.getAll);
route.get('/:id', salesControllers.getById);
route.post('/', validadeSales, salesControllers.insertSales);

module.exports = route;