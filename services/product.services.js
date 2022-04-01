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
  if (!boolValid) return null;

  const getByIdModel = await ProductsModel.getById(id);
  if (!getByIdModel) return null;
  return getByIdModel;
};

 const insertProductService = async ({ name, quantity }) => {
  const data = { name, quantity };
  const existProduct = await ProductsModel.existProduct(name);
  console.log(existProduct);
  const newProduct = await ProductsModel.insertProduct(data);

  if (existProduct.result === 'exist') {
    return { status: { status: 409 }, message: { message: 'Product already exists' } };
  }
  return { status: { status: 201 }, message: newProduct };
};

module.exports = {
  getAllService,
  getByIdService,
  insertProductService,
};
