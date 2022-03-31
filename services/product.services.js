const { getAll, getById } = require('../models/products.model');

const isValid = (id) => {
  if (!id || typeof id !== 'number') return false;
  return true;
};

const getAllService = async () => {
  const getAllModel = await getAll();
  return getAllModel;
};

const getByIdService = async (id) => {
  if (!isValid(id)) return null;
  const getByIdModel = await getById(id);
  if (!getByIdModel) return null;
  return getByIdModel;
};

module.exports = {
  getAllService,
  getByIdService,
};
