const productsModel = require('../models/products.model');

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  return { status: 200, data: allProducts };
}; 

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { status: 404, data: { message: 'Product not found' } };
  return { status: 200, data: product };
};

module.exports = {
  getAll,
  getById,
};