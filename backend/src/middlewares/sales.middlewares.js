const productsModel = require('../models/products.model');

const validateProductId = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsModel.getById(id);
  if (!product) {
    return res.status(404).json({ message: '"productId" is required' });
  }
  next();
};

module.exports = {  
  validateProductId,
};