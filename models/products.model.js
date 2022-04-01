const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [result] = await connection.execute(query);

  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);

  if (result < 1) return null;
  return result[0];
};

const existProduct = async (name) => {
  const query = `
  SELECT 
  CASE 
  WHEN EXISTS(SELECT name FROM StoreManager.products WHERE name = ?)
  THEN 'exist'
  END AS result;
  `;
  const [result] = await connection.execute(query, [name]);
  return result[0];
};

const insertProduct = async ({ name, quantity }) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
  VALUES (?, ?)`;
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  existProduct,
  insertProduct,
};
