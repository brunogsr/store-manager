const { salesModel } = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const findSalesById = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale || sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' },
    }; 
  }
  return { status: 200, data: sale };
};

module.exports = {
  getAllSales,
  findSalesById,
};
