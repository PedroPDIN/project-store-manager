const ProductsServices = require('../services/product.services');

const getAllController = async (_req, res) => {
  const getAll = await ProductsServices.getAllService();
  return res.status(200).json(getAll);
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const getById = await ProductsServices.getByIdService(id);

  if (!getById) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(getById);
};

module.exports = {
  getAllController,
  getByIdController,
};
