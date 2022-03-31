const ProductsModel = require('../models/products.model');

const isValid = (id) => {
  if (!id || typeof id !== 'number') return false;
  return true;
};

const getAllService = async () => {
  const getAllModel = await ProductsModel.getAll();
  return getAllModel;
};

const getByIdService = async (id) => {
  const boolValid = isValid(id);
  if (boolValid) return null;

  const getByIdModel = await ProductsModel.getById(id);
  if (!getByIdModel) return null;
  return getByIdModel;
};

module.exports = {
  getAllService,
  getByIdService,
};
