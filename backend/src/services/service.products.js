const { productsModel } = require('../models');

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  return allProducts;
}; 

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { status: 404, data: { message: 'Product not found' } };
  return { status: 200, data: product };
};

module.exports = {
  getAll,
  findById,
};