const User = require('../models/users.model');
const bcrypt = require('bcrypt');

async function httpRegisterUser(req, res) {
  try {
    const hashPassword = await bcrypt.hashSync(req.body.password, 10);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  httpRegisterUser,
};
