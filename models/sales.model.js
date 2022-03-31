const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT 
  sp.sale_id AS saleId,
  s.date,
  sp.product_id AS productId, 
  sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s 
  ON sp.sale_id = s.id
  ORDER BY sale_id, product_id;
`;
const [result] = await connection.execute(query);
return result;
};

const getById = async (id) => {
  const query = `
  SELECT 
  s.date,
  sp.product_id AS productId, 
  sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s 
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?
  ORDER BY sale_id, product_id;
  `;

  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
};
