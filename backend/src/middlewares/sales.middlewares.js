const errorMap = require('./errorMap');
const { productSaleSchema } = require('./schemas');

const validadeSalesObj = (salesObj) => productSaleSchema.validate(salesObj);

const validadeSales = async (req, res, next) => {
  const { body } = req;
  const resultsArray = body.map((product) => validadeSalesObj(product));
  const result = resultsArray.find((e) => e.error); // se JOI retornar erro
  if (result) {
    console.log(result);
    // console.log('---------------------------------------------');
    const { error } = result;
    console.log(error);
    const { type, message } = error.details[0];
    // console.log(errorMap(type));
    return res.status(errorMap(type)).json({ message });
  }
  next();
};

module.exports = {  
  validadeSales,
};