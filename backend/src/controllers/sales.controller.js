const { salesServices } = require('../services');

const findAllSales = async (_req, res) => {
  const sales = await salesServices.findAllSales();
  res.status(sales.status).json(sales.data);
};

const findSalesById = async (req, res) => { 
  const { id } = req.params;
  const sale = await salesServices.findSalesById(id);
  res.status(sale.status).json(sale.data);
};

module.exports = {
  findAllSales,
  findSalesById,
};