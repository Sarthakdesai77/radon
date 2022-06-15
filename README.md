# TOPIC: Authorisation

## Authentication with JWT
- Token generation
- Token verification

## Assignment
- For this assignment you have to create a new branch - **assignment/auth-3**
- Your user document should look like this
```
 	{
    "_id" : ObjectId("6226e3d2b98f22b349ca58be"),
    "firstName" : "Sabiha",
    "lastName" : "Khan",
    "mobile" : "9898909087",
    "emailId" : "sk@gmail.com",
    "password" : "password123",
    "gender" : "female",
	"isDeleted": false, //default value is false 
    "age" : 12,
    "createdAt" : ISODate("2022-03-08T05:04:18.737Z"),
    "updatedAt" : ISODate("2022-03-08T05:04:18.737Z"),
    "__v" : 0
}
```


- Write a POST api to register a user from the user details in request body. 
- Write a POST api to login a user that takes user details like email and password from the request body. If the credentials don't match with any user's data return a suitable error.
On successful login, generate a JWT token and return it both in response body.
- Write a GET api to fetch user details. Pass the userId as path param in the url. Check that request must contain x-auth-token header. If absent, return a suitable error.
If present, check that the token is valid.
- Write a PUT api to update user details. Pass the userId as path param in the url and update the attributes received in the reauest body. Check that request must contain x-auth-token header. If absent, return a suitable error.
- Write a DELETE api that takes the userId in the path params and marks the isDeleted attribute for a user as true. Check that request must contain x-auth-token header. If absent, return a suitable error.
- Once, all the apis are working fine, move the authentication related code in a middleware called auth.js
- Add this middleware at route level in the routes where applicale.

```diff
+ Please note that you have to also write the logic for authorisation now so that a logged in user can modify or fetch only their own data.
+ You have to implement authorisation for fetch user details, update user and delete user apisg
+ You have to move this similar code in all three apis in a suitable middleware

``` 

const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request
  //the second parameter is always the response
  let data = abcd.body;
  let savedData = await userModel.create(data);
  console.log(abcd.newAtribute);
  xyz.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: 'username or the password is not corerct',
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: 'thorium',
      organisation: 'FUnctionUp',
    },
    'functionup-thorium'
  );
  res.setHeader('x-auth-token', token);
  res.send({ status: true, data: token });
};

const getUserData = async function (req, res) {
  let token = req.headers['x-Auth-token'];
  if (!token) token = req.headers['x-auth-token'];

  //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: 'token must be present' });

  console.log(token);

  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
  let decodedToken = jwt.verify(token, 'functionup-thorium');
  if (!decodedToken)
    return res.send({ status: false, msg: 'token is invalid' });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: 'No such user exists' });

  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send('No such user exists');
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: updatedUser, data: updatedUser });
};

const postMessage = async function (req, res) {
  let message = req.body.message;
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases
  let token = req.headers['x-auth-token'];
  if (!token)
    return res.send({
      status: false,
      msg: 'token must be present in the request header',
    });
  let decodedToken = jwt.verify(token, 'functionup-thorium');

  if (!decodedToken)
    return res.send({ status: false, msg: 'token is not valid' });

  //userId for which the request is made. In this case message to be posted.
  let userToBeModified = req.params.userId;
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId;

  //userId comparision to check if the logged-in user is requesting for their own data
  if (userToBeModified != userLoggedIn)
    return res.send({
      status: false,
      msg: 'User logged is not allowed to modify the requested users data',
    });

  let user = await userModel.findById(req.params.userId);
  if (!user) return res.send({ status: false, msg: 'No such user exists' });

  let updatedPosts = user.posts;
  //add the message to user's posts
  updatedPosts.push(message);
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: user._id },
    { posts: updatedPosts },
    { new: true }
  );

  //return the updated user document
  return res.send({ status: true, data: updatedUser });
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage;

route 

const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", userController.getUserData)
router.post("/users/:userId/posts", userController.postMessage)

router.put("/users/:userId", userController.updateUser)
router.delete('/users/:userId', userController.deleteUser)

module.exports = router;

model 

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobile: {
      type: String,
      required: true,
    },
    emailId: String,
    password: String,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    age: Number,
    posts: { type: [], deafult: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserAuth', userSchema);