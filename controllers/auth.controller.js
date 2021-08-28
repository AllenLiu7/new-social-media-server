const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const { genAccessToken, genRefreshToken } = require('../services/jwt');
const createError = require('http-errors');
const redisClient = require('../app');

let refreshTokenStore = [];

//register new user
async function httpRegisterUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(createError(400, 'email exists'));
    }

    const newUser = await new User(req.body);
    await newUser.save();

    return res.status(200).json(newUser);
  } catch (err) {
    return next(createError(500, err));
  }
}

//login user
async function httpLoginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(400, 'wrong username or password 1'));
    }

    const valid = await user.isValidPassword(req.body.password);
    if (!valid) {
      return next(createError(400, 'wrong username or password 2'));
    }

    //generate access token
    const accessToken = genAccessToken(user);
    //refresh token should be store in db, such as redis
    const refreshToken = genRefreshToken(user);
    refreshTokenStore.push(refreshToken);

    const { password, ...others } = user._doc;

    return res.status(200).json({ user: others, accessToken, refreshToken });
  } catch (err) {
    return next(createError(500, err));
  }
}

//refresh token
async function httpRefreshToken(req, res, next) {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(401).send('No refresh token');
    if (!refreshTokenStore.includes(refreshToken))
      return res.status(401).send('Refresh token is not valid');
    //if token exist, verify it
    jwt.verify(refreshToken, 'theSecretRefreshKey', (err, user) => {
      err && console.log(err);

      //if verify successfully, delete the token in the store
      refreshTokenStore = refreshTokenStore.filter((x) => x !== refreshToken);

      //generate new access token and refresh token to response
      const newAccessToken = genAccessToken(user);
      //refresh token should be store in db, such as redis
      const newRefreshToken = genRefreshToken(user);
      refreshTokenStore.push(newRefreshToken);

      return res
        .status(200)
        .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  } catch (err) {
    return next(createError(500, err));
  }
}

//log out (/logout, clear refresh token)
async function httpClearToken(req, res, next) {
  try {
    const refreshToken = req.body.token;
    refreshTokenStore = refreshTokenStore.filter((x) => x !== refreshToken);
    return res.status(200).send('user logged out');
  } catch (err) {
    return next(createError(500, err));
  }
}

//check username is used
async function httpCheckUsername(req, res, next) {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (user) return res.status(200).json(user.username);
    res.status(200).json(null);
  } catch (err) {
    return next(createError(500, err));
  }
}

//check email is exist
async function httpCheckEmail(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(200).json(user.email);
    res.status(200).json(null);
  } catch (err) {
    return next(createError(500, err));
  }
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
  httpCheckUsername,
  httpCheckEmail,
  httpRefreshToken,
  httpClearToken,
};
