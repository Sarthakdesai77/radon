const jwt = require('jsonwebtoken');

const authenticate = function (req, res, next) {
  try {
    let token = req.headers['x-Auth-token'];
    if (!token) token = req.headers['x-auth-token'];
    if (!token)
      return res
        .status(401)
        .send({ msg: 'UNAUTHORISED', error: 'token must be present' });
    let decodedToken = jwt.verify(token, 'functionup-radon');
    if (!decodedToken)
      return res
        .status(401)
        .send({ msg: 'UNAUTHORISED', error: 'token is not valid' });
    next();
  } catch (err) {
    console.log('This is the error :', err.message);
    res.status(500).send({ msg: 'ERROR', error: err.message });
  }
};

const authorise = function (req, res, next) {
  try {
    let token = req.headers['x-Auth-token'];
    if (!token) token = req.headers['x-auth-token'];
    let userToBeModified = req.params.userId;
    let decodedToken = jwt.verify(token, 'functionup-radon');
    let userLoggedIn = decodedToken.userId;
    if (userToBeModified != userLoggedIn)
      return res.status(403).send({
        msg: 'FORBIDDEN',
        error: 'User logged is not allowed to modify the requested users data',
      });
    next();
  } catch {
    console.log('This is the error :', err.message);
    res.status(500).send({ msg: 'Error', error: err.message });
  }
};

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
