const productsModel = require('../models/products.model');

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  return { status: 200, data: allProducts };
}; 

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  if (product.length < 5) return { status: 'BAD_REQUEST', data: { message: 'Wrong id format' } };
  return { status: null, data: product };
};

const insertProduct = async (name) => {
  const id = await productsModel.insertProduct(name);
  const product = { id, name };
  return { status: 201, data: product };
};

const updateProduct = async (id, name) => {
  const verifyProduct = await productsModel.getById(id);
  if (!verifyProduct) return { status: 404, data: { message: 'Product not found' } };
  const product = await productsModel.updateProduct(id, name);
  return { status: 200, data: product };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
};  