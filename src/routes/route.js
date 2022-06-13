const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/userController');
const productcontroller = require('../controllers/productcontroller');
const ordercontroller = require('../controllers/ordercontroller');
const commonMW = require('../middlewares/commonMiddlewares');

router.post('/createProduct', productcontroller.createProduct);

router.post('/createUser', commonMW.midd, usercontroller.createUser);

router.post(
  '/checkuserandproduct',
  commonMW.midd3,
  commonMW.midd1,
  commonMW.midd2,
  ordercontroller.details
);

module.exports = router;
