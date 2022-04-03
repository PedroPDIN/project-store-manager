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

const insertSale = async (sale) => {
  const itemsSold = [];
  const queryDate = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const queryData = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?);
  `;

  const [{ insertId }] = await connection.execute(queryDate);

  await sale.forEach(({ productId, quantity }) => {
    const data = { productId, quantity };
    itemsSold.push(data);
    connection.execute(queryData, [insertId, productId, quantity]);
  });

  return { id: insertId, itemsSold };
};

module.exports = {
  getAll,
  getById,
  insertSale,
};
