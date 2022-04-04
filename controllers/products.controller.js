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
    .json(insertProduct.message);
  }
  return res
  .status(insertProduct.status.status)
  .json(insertProduct.data);
};

const updateProductController = async (req, res) => {
 const { id } = req.params;
 const { name, quantity } = req.body;
 const data = { name, quantity };
 const updateProduct = await ProductsServices.updateProductService(id, data);
 const STATUS_EXAMPLE = 400;

 if (updateProduct.status.status >= STATUS_EXAMPLE) {
   return res
   .status(updateProduct.status.status)
   .json(updateProduct.message);
 }

 return res
 .status(updateProduct.status.status)
 .json(updateProduct.data);
};

 const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await ProductsServices.deleteProductService(id);
  const STATUS_EXAMPLE = 400;

  if (deleteProduct.status.status >= STATUS_EXAMPLE) {
    return res
    .status(deleteProduct.status.status)
    .json(deleteProduct.message);
  }
  return res
  .status(deleteProduct.status.status).end();
 };

module.exports = {
  getAllController,
  getByIdController,
  insertProductController,
  updateProductController,
  deleteProductController,
};
