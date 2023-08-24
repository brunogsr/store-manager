const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sale_id AS saleId, product_id AS productId, quantity, date
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
  ORDER BY sa.id ASC, sp.product_id;
  `;
  const [sales] = await connection.execute(query);
  console.log(sales, 'este é o model');
  return (sales);
};

const getById = async (id) => {
  const query = `SELECT s.date, sp.product_id AS productId, sp.quantity
  FROM sales s
  JOIN sales_products sp ON s.id = sp.sale_id
  WHERE s.id = ?;  
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
  console.log(insertId, 'este é o model');
  return insertId;
};

module.exports = {
  getAll,
  getById,
  insertSales,
};
