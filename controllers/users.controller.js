const { findByIdAndUpdate } = require('../models/users.model');
const User = require('../models/users.model');

//get current user
async function httpGetUser(req, res) {
  try {
    const user = await User.findById(req.params.userid);
    if (user) {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

//get current user's friends

module.exports = {
  httpGetUser,
};
