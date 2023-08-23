const salesServices = require('../services/sales.service');

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();
  res.status(sales.status).json(sales.data);
};

const getById = async (req, res) => { 
  const { id } = req.params;
  const sale = await salesServices.getById(id);
  res.status(sale.status).json(sale.data);
};

module.exports = {
  getAll,
  getById,
};