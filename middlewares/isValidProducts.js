const isValidNameProduct = (req, res, next) => {
  const { name } = req.body;
  const nameLength = name && name.length;
  const LIMIT = 5;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (nameLength <= LIMIT) {
     return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const isValidQuantityProduct = (req, res, next) => {
  const { quantity } = req.body;
  const LIMIT = 1;
  
  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (quantity < LIMIT) {
    return res
    .status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  isValidNameProduct,
  isValidQuantityProduct,
};
