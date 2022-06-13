const orderModel = require('../models/ordermodel');

const details = async function (req, res) {
  let data = req.body;
  let saveData = await orderModel.create(data);
  let allData = await saveData.populate(['productId', 'userId']);
  res.send(allData);
};

module.exports.details = details;
