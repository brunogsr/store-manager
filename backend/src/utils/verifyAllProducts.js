const productServices = require('../services/products.service');

const verifyAllProducts = async (salesArray) => {
  const productsVerirficationId = await Promise.all(salesArray.map(async ({ productId }) => {
    const productExist = await productServices.getById(productId);
    // console.log(productExist);
    return productExist.status !== 404;
  }));
  const productsVerificationArr = await Promise.all(productsVerirficationId);
  console.log(productsVerificationArr);
  // é uma promisse /\
  const isEveryTrue = productsVerificationArr.every((e) => e === true);

  return isEveryTrue; // true or false
};

module.exports = verifyAllProducts;