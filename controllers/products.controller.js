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

const insertProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const data = { name, quantity };
  const insertProduct = await ProductsServices.insertProductService(data);
  const STATUS_EXAMPLE = 400;

  if (insertProduct.status.status >= STATUS_EXAMPLE) {
    return res
    .status(insertProduct.status.status)
    .json(insertProduct.message.message);
  }
  return res
  .status(insertProduct.status.status)
  .json(insertProduct.message);
};

module.exports = {
  getAllController,
  getByIdController,
  insertProductController,
};
