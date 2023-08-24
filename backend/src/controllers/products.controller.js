const productServices = require('../services/products.service');

const getAll = async (_req, res) => {
  const products = await productServices.getAll();
  return res.status(products.status).json(products.data);
};
const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productServices.getById(id);
  return res.status(product.status).json(product.data);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productServices.insertProduct(name);
  return res.status(product.status).json(product.data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productServices.updateProduct(id, name);
  return res.status(product.status).json(product.data);
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
};
