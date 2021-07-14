const User = require('../models/users.model');
const createError = require('http-errors');

//register new user
async function httpRegisterUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(createError(400, 'email exists'));
    }

    const newUser = await new User(req.body);
    const userInfo = await newUser.save();

    return res.status(200).json(userInfo);
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

    return res.status(200).json(user);
  } catch (err) {
    return next(createError(500, err));
  }
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
};
