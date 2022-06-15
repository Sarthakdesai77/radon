const jwt = require('jsonwebtoken');

const authenticate = function (req, res, next) {
  let token = req.headers['x-Auth-token'];
  if (!token) token = req.headers['x-auth-token'];
  if (!token) return res.send({ status: false, msg: 'token must be present' });
  let decodedToken = jwt.verify(token, 'functionup-radon');
  if (!decodedToken)
    return res.send({ status: false, msg: 'token is not valid' });
  next();
};

const authorise = function (req, res, next) {
  let token = req.headers['x-Auth-token'];
  if (!token) token = req.headers['x-auth-token'];
  let userToBeModified = req.params.userId;
  let decodedToken = jwt.verify(token, 'functionup-radon');
  let userLoggedIn = decodedToken.userId;
  if (userToBeModified != userLoggedIn)
    return res.send({
      status: false,
      msg: 'User logged is not allowed to modify the requested users data',
    });
  next();
};

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
