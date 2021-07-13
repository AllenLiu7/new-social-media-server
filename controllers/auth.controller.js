const User = require('../models/users.model');
const bcrypt = require('bcrypt');

//register new user
async function httpRegisterUser(req, res) {
  try {
    //if user.email exist, send error
    const user = await User.findOne({ email: req.body.email });
    user && res.status(400).send('user email exists');

    const newUser = await new User(req.body);

    const userInfo = await newUser.save();
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
}

//login user
async function httpLoginUser(req, res) {
  //find the user email in the database, if not , send error
  try {
    const user = await User.findOne({ email: req.body.email });
    user || res.status(400).send('wrong username or password');

    const valid = await user.isValidPassword(req.body.password);
    valid || res.status(400).send('wrong username or password');

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
};
