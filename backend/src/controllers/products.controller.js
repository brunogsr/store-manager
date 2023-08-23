const productServices = require('../services/products.service');

const getAll = async (_req, res) => {
  const products = await productServices.getAll();
  res.status(products.status).json(products.data);
};
const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productServices.getById(id);
  res.status(product.status).json(product.data);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productServices.insertProduct(name);
  res.status(product.status).json(product.data);
};

module.exports = {
  getAll,
  getById,
  insertProduct,
};
