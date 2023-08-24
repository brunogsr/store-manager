const camelize = require('camelize');

const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  return camelize(products);
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[productId]] = await connection.execute(
    query,
    [id],
  );
  return camelize(productId);
};

const insertProduct = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  console.log(insertId);
  return insertId;
};

const updateProduct = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
  return { id: Number(id), name };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
};