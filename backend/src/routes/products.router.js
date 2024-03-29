const route = require('express').Router();

const productsControllers = require('../controllers/products.controller');
const { validateName } = require('../middlewares/products.middlewares');

route.get('/', productsControllers.getAll);
route.get('/:id', productsControllers.getById);
route.post('/', validateName, productsControllers.insertProduct);
route.put('/:id', validateName, productsControllers.updateProduct);

module.exports = route;
