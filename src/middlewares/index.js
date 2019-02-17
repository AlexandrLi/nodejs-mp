const jwt = require('jsonwebtoken');
const secret = require('../routes/auth').SECRET;

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, token) => {
      if (err || !token) {
        res.status(401).send('Invalid or expired token');
      } else {
        next();
      }
    });
  } else {
    res.status(401).send('Invalid or expired token');
  }
}



module.exports = {verifyToken};
