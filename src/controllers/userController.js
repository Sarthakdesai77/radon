const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const createUser = async function (abcd, xyz) {
  try {
    let data = abcd.body;
    let savedData = await userModel.create(data);
    xyz
      .status(201)
      .send({ msg: 'NEW RESOURCE SUCCESSFULLY CREATED', data: savedData });
  } catch (err) {
    console.log('This is the error :', err.message);
    xyz.status(500).send({ msg: 'ERROR', error: err.message });
  }
};

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({
      emailId: userName,
      password: password,
    });
    if (!user) return res.status(400).send({ msg: 'BAD REQUEST' });
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: 'radon',
        organisation: 'FunctionUp',
      },
      'functionup-radon'
    );
    res.setHeader('x-auth-token', token);
    res.status(200).send({ msg: 'REQUEST WAS ACCEPTED', token: token });
  } catch (err) {
    console.log('This is the error :', err.message);
    res.status(500).send({ msg: 'ERROR', error: err.message });
  }
};

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(404).send({ msg: 'RESOURCE NOT FOUND' });
    res.send({ status: true, data: userDetails });
  } catch (err) {
    console.log('This is the error :', err.message);
    res.status(500).send({ msg: 'ERROR', error: err.message });
  }
};

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) return res.status(404).send({ msg: 'RESOURCE NOT FOUND' });
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userData,
      { new: true }
    );
    res
      .status(201)
      .send({ msg: 'NEW RESOURCE SUCCESSFULLY CREATED', data: updatedUser });
  } catch {
    console.log('This is the error :', err.message);
    res.status(500).send({ msg: 'ERROR', error: err.message });
  }
};

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.send(404).send({ msg: 'RESOURCE NOT FOUND' });
    }
    let deletedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true }
    );
    res
      .status(201)
      .send({ msg: 'NEW RESOURCE SUCCESSFULLY CREATED', data: deletedUser });
  } catch {
    console.log('This is the error :', err.message);
    res.status(500).send({ msg: 'ERROR', error: err.message });
  }
};

const postMessage = async function (req, res) {
  let user = await userModel.findById(req.params.userId);
  if (!user) return res.send({ status: false, msg: 'No such user exists' });
  let updatedPosts = user.posts;
  let message = req.body.message;
  updatedPosts.push(message);
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: user._id },
    { posts: updatedPosts },
    { new: true }
  );
  return res.send({ status: true, data: updatedUser });
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage;
