const jwt = require('jsonwebtoken');
const client = require('../services/redis');
const { v4: uuidv4 } = require('uuid');

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).send('No token');

  jwt.verify(token, 'theSecretKey', (err, payload) => {
    if (err) return res.status(403).send('Token is not valid');

    next();
  });
};

const verifyRefreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (token == null) return res.status(401).send('No token');

  try {
    jwt.verify(token, 'theSecretRefreshKey', (err, payload) => {
      //console.log(err);

      if (err) return res.status(403).send('RefreshToken is not valid');

      //check if the token is in Redis
      //payload: {id: user._id, ...others}
      client.get(payload.id.toString(), (err, data) => {
        if (err) throw err;

        //return null is the key does not exist
        if (data === null)
          return res.status(401).json({
            status: false,
            message: 'Invalid request. Token is not in store.',
          });
        //data an object contain key and value
        //console.log('redis get', data);
        if (data != token)
          return res.status(401).json({
            status: false,
            message: 'Invalid request. Token is not same in store.',
          });

        req.tokenPayload = payload;
        next();
      });
    });
  } catch (err) {
    return next(createError(500, err));
  }
};

//JWT token payload: {id: userId, ...others}
const genAccessToken = (userId) => {
  return jwt.sign({ id: userId }, 'theSecretKey', {
    expiresIn: '10s',
  });
};

const genRefreshToken = (userId) => {
  const uuid = uuidv4();
  const refreshToken = jwt.sign({ id: userId, uuid }, 'theSecretRefreshKey', {
    expiresIn: '15m',
  });
  client.set(userId.toString(), refreshToken, (err, reply) => {
    if (err) throw err;
    console.log('Set Redis:', reply);
  });

  return refreshToken;
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
  genAccessToken,
  genRefreshToken,
};
