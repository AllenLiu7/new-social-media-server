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

    return res.status(200).json(user);
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
};
