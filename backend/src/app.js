const express = require('express');
const productRouter = require('./routes/products.router');
const salesRouter = require('./routes/sales.router');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;

app.use(express.json());
app.use('/products', productRouter);
app.use('/sales', salesRouter);
