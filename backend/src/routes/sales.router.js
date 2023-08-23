const express = require('express');
const { salesControllers } = require('../controllers');

const route = express.Router();

route.get('/', salesControllers.getAll);
route.get('/:id', salesControllers.findById);

module.exports = route;