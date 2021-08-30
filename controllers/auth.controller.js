const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const { genAccessToken, genRefreshToken } = require('../services/jwt');
const createError = require('http-errors');
const client = require('../services/redis');

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
    const accessToken = genAccessToken(user._id);
    //refresh token should be store in db, such as redis
    const refreshToken = genRefreshToken(user._id);

    const { password, ...others } = user._doc;

    return res.status(200).json({ user: others, accessToken, refreshToken });
  } catch (err) {
    return next(createError(500, err));
  }
}

//refresh token (please sent userId as well), will be verify using middleware
async function httpRefreshToken(req, res, next) {
  try {
    const id = req.body.userId;
    //generate new access token
    const newAccessToken = genAccessToken(id);
    //generate new refresh token which will replace the old one in redis
    const newRefreshToken = genRefreshToken(id);

    return res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return next(createError(500, err));
  }
}

//log out (/logout, clear refresh token)
async function httpClearToken(req, res, next) {
  try {
    const id = req.body.userId;

    //delete refresh token in redis
    client.del(id.toString(), function (err, response) {
      if (response == 1) {
        console.log('Deleted Successfully!');
      } else {
        console.log('Cannot delete');
      }
    });

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
