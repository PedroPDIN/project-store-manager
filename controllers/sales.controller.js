const SalesServices = require('../services/sales.services');

const getAllController = async (_req, res) => {
  const getAll = await SalesServices.getAllService();
  return res.status(200).json(getAll);
};

const getByIdController = async (req, res) => {
    const { id } = req.params;
    const getById = await SalesServices.getByIdService(id);
  
    if (!getById || getById.length < 1) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(getById);
  };

const insertSaleController = async (req, res) => {
  const newSale = req.body;
  const insertSale = await SalesServices.insertSaleService(newSale);
  return res.status(201).json(insertSale);
};

module.exports = {
    getAllController,
    getByIdController,
    insertSaleController,
};
