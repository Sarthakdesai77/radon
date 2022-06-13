const userModel = require('../models/userModel');

const createUser = async function (req, res) {
  let data = req.body;
  let header = req.headers.isfreeappuser;
  let userData = await userModel.create(data);
  res.header('isfreeappuser', header);
  res.send({ data: userData });
};

module.exports.createUser = createUser;
