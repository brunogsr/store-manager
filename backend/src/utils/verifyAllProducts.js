const productServices = require('../services/products.service');

const verifyAllProducts = async (salesArray) => {
  const productsVerirficationId = salesArray.map(async ({ productId }) => {
    const productExist = await productServices.getById(productId);

    return !!productExist; // !! converts to boolean
    // se o produto existir retorna true, se não existir retorna false
    // verificando cada produto se é true ou false
  });

  // const productsVerificationArr = await Promise.all(productsVerirficationId);
  // não é uma promisse /\
  const isEveryTrue = productsVerirficationId.every((e) => e === true);

  return isEveryTrue; // true or false
};

module.exports = verifyAllProducts;