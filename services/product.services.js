const ProductsModel = require('../models/products.model');

const getAllService = async () => {
  const getAllModel = await ProductsModel.getAll();
  return getAllModel;
};

const getByIdService = async (id) => {
  const getByIdModel = await ProductsModel.getById(Number(id));
  if (!getByIdModel) return null;
  return getByIdModel;
};

const insertProductService = async ({ name, quantity }) => {
  const data = { name, quantity };
  const existProduct = await ProductsModel.existProduct(name);
  const newProduct = await ProductsModel.insertProduct(data);

  if (existProduct.result === 'exist') {
    return { status: { status: 409 }, message: { message: 'Product already exists' } };
  }
  return { status: { status: 201 }, data: newProduct };
};

const updateProductService = async (id, { name, quantity }) => {
  const data = { name, quantity };
  const updateProduct = await ProductsModel.updateProduct(id, data);
  const getById = await getByIdService(id);

  if (!getById) {
    return { status: { status: 404 }, message: { message: 'Product not found' } };
  }
  return { status: { status: 200 }, data: updateProduct };
};

const deleteProductService = async (id) => {
  const getById = await getByIdService(id);

  if (!getById) {
    return { status: { status: 404 }, message: { message: 'Product not found' } };
  }

  await ProductsModel.deleteProduct(id);
  return { status: { status: 204 } };
};

module.exports = {
  getAllService,
  getByIdService,
  insertProductService,
  updateProductService,
  deleteProductService,
};
