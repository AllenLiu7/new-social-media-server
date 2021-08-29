const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).send('No token');

  jwt.verify(token, 'theSecretKey', (err, user) => {
    console.log(err);

    if (err) return res.status(403).send('Token is not valid');

    req.user = user;

    next();
  });
};

const genAccessToken = (userId) => {
  return jwt.sign({ id: userId }, 'theSecretKey', {
    expiresIn: '30s',
  });
};

const genRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, 'theSecretRefreshKey', {
    expiresIn: '15m',
  });
};

module.exports = { verifyAccessToken, genAccessToken, genRefreshToken };
