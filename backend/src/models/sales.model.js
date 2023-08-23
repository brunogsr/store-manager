const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sale_id AS saleId, product_id AS productId, quantity, date
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
  ORDER BY sa.id ASC, sp.product_id;
  `;
  const [sales] = await connection.execute(query);
  return (sales);
};

const getById = async (id) => {
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
  getAll,
  getById,
};