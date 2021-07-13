function httpGetUsers(req, res) {
  return res.status(200).send('you get all users');
}

module.exports = {
  httpGetUsers,
};
