const orderModel = require('../models/ordermodel');
const userModel = require('../models/userModel');
const productModel = require('../models/productmodel');

const midd = function (req, res, next) {
  check = req.headers.isfreeappuser;
  if (check) {
    next();
  } else {
    res.send('Please enter the header');
  }
};

const midd1 = async function (req, res, next) {
  let data = req.body;
  if (data.userId) {
    let user = await userModel.find({ _id: data.userId }).select({ _id: 1 });
    if (user) {
      next();
    } else {
      res.send('user id does not exists');
    }
  } else {
    res.send('please enter userid');
  }
};

const midd2 = async function (req, res, next) {
  let data = req.body;
  if (data.productId) {
    let product = await productModel
      .find({ _id: data.productId })
      .select({ _id: 1 });
    if (product) {
      next();
    } else {
      res.send('product id does not exists');
    }
  } else {
    res.send('please enter product id');
  }
};

const midd3 = async function (req, res, next) {
  let data = req.body;
  let user = await userModel.findOne({ _id: data.userId });
  let product = await productModel.findOne({ _id: data.productId });
  console.log(product.price);
  console.log(user.balance);
  check = req.headers.isfreeappuser;
  if (check) {
    next();
  } else {
    if (product.price < user.balance) {
      let value = user.balance - product.price;
      let userBalance = await userModel.findOneAndUpdate(
        { _id: data.userId },
        { $set: { balance: value } },
        { new: true }
      );
      let saveData = await orderModel.create(data);
      let allData = await saveData.populate(['productId', 'userId']);
      res.send(allData);
    } else {
      res.send('balance not sufficient');
    }
  }
};

module.exports.midd = midd;
module.exports.midd1 = midd1;
module.exports.midd2 = midd2;
module.exports.midd3 = midd3;
