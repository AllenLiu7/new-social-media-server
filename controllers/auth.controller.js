const User = require('../models/users.model');
const bcrypt = require('bcrypt');

//register new user
async function httpRegisterUser(req, res) {
  try {
    //if user.email exist, send error
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send('user email exists');
    }

    const newUser = await new User(req.body);
    const userInfo = await newUser.save();
    return res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
}

//login user
async function httpLoginUser(req, res) {
  try {
    //find the user email in the database, if not , send error
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('wrong username or password');
    }

    //check if the password is valid
    const valid = await user.isValidPassword(req.body.password);
    if (valid) {
      return res.status(400).send('wrong username or password');
    }

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
};
