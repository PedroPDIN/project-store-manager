const isValidProductIdSales = (req, res, next) => {
  const sales = req.body;
  const value = sales[0].productId;
  if (!value) return res.status(400).json({ message: '"productId" is required' });
  next();
};

const isValidQuantitySales = (req, res, next) => {
  const sales = req.body;
  console.log(sales);
  const value = sales[0].quantity;
  const LIMIT = 1;

  if (!value && value !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (value < LIMIT) { 
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  isValidProductIdSales,
  isValidQuantitySales,
};
