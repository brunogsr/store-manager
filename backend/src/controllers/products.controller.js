const productServices = require('../services/products.service');

const getAll = async (_req, res) => {
  const products = await productServices.getAll();
  res.status(products.status).json(products.data);
};
const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productServices.findById(id);
  res.status(product.status).json(product.data);
};

module.exports = {
  getAll,
  findById,
};
