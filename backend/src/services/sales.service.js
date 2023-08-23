const salesModel = require('../models/sales.model');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { status: 200, data: sales };
};

const getById = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale || sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' },
    }; 
  }
  return { status: 200, data: sale };
};

module.exports = {
  getAll,
  getById,
};
