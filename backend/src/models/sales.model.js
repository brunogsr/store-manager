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

const insertSales = async (sales) => {
  const date = new Date();
  const queryDate = 'INSERT INTO sales (date) VALUES (?)';
  const [{ insertId }] = await connection.execute(queryDate, [date]);
  // console.log(sales, 'este é o model');
  const eachSale = sales.map((sale) => {
    const querySales = `INSERT INTO sales_products
     (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    return connection.execute(querySales, [insertId, sale.productId, sale.quantity]);
  });
  await Promise.all(eachSale);
  return insertId;
};

module.exports = {
  getAll,
  getById,
  insertSales,
};
