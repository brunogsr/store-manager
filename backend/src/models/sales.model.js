const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT s.sale_id AS saleId,
  sp.product_id AS productId,
  s.date, sp.quantity FROM sales s
  INNER JOIN sales_products sp ON s.sale_id = sp.sale_id;
  `;
  const [sales] = await connection.execute(query);
  return (sales);
};

const findSalesById = async (id) => {
  const query = `SELECT s.sale_id AS saleId,
  sp.product_id AS productId,
  s.date, sp.quantity FROM sales s
  INNER JOIN sales_products sp ON s.sale_id = sp.sale_id
  WHERE s.sale_id = ?;
  `;
  const [sale] = await connection.execute(query, [id]);
  return (sale);
};

module.exports = {
  getAllSales,
  findSalesById,
};