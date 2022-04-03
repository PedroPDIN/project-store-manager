const SalesModel = require('../models/sales.model');

const isValid = (id) => {
  if (!id || typeof id !== 'number') return false;
  return true;
};

const getAllService = async () => {
  const getAll = await SalesModel.getAll();
  return getAll;
};

const getByIdService = async (id) => {
  const boolValid = isValid(id);
  if (boolValid) return null;

  const getByIdModel = await SalesModel.getById(id);
  if (!getByIdModel) return null;
  return getByIdModel;
};

const insertSaleService = async (sale) => {
  const insertSale = await SalesModel.insertSale(sale);
  return insertSale;
};

const updateSaleService = async ({ id, productId, quantity }) => {
  const data = { id, productId, quantity };
  const updateSale = await SalesModel.updateSale(data);
  return updateSale;
};

module.exports = {
  getAllService,
  getByIdService,
  insertSaleService,
  updateSaleService,
};
