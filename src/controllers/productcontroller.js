const productModel = require('../models/productmodel');

const createProduct = async function (req, res) {
  let productData = req.body;
  let productDetails = await productModel.create(productData);
  res.send({ data: productDetails });
};

module.exports.createProduct = createProduct;
