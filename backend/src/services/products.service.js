const productsModel = require('../models/products.model');

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  console.log(allProducts);
  return { status: 200, data: allProducts };
}; 

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { status: 404, data: { message: 'Product not found' } };
  return { status: 200, data: product };
};

const insertProduct = async (name) => {
  const product = await productsModel.insertProduct(name);
  return { status: 201, data: product };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
};