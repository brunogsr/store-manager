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

const insertSales = async (req, res) => {
  const sales = req.body;
  // console.log(sales, 'este é o sales no controller');
  const sale = await salesServices.insertSales(sales);
  console.log(sale, 'este é sale no controller');
  // console.log(sale.status, 'este é o sale.status no controller');
  console.log(sale.data, 'este é o sale.data no controller');
  res.status(sale.status).json(sale.data);
};

module.exports = {
  getAll,
  getById,
  insertSales,
};