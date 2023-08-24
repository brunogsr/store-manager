const salesModel = require('../models/sales.model');
const verifyAllProducts = require('../utils/verifyAllProducts');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { status: 200, data: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale || sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' },
    }; 
  }
  return { status: 200, data: sale };
};

const insertSales = async (sales) => {
  const productsExistVer = await verifyAllProducts(sales);

  if (!productsExistVer) return { status: 404, data: { message: 'Product not found' } };

  const id = await salesModel.insertSales(sales);

  const data = {
    id,
    itemsSold: sales,
  };

  return { status: 201, data };
};

module.exports = {
  getAll,
  getById,
  insertSales,
};
