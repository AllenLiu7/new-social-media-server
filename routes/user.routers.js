const express = require('express');
const { httpGetUsers } = require('../controllers/users.controller.js');

const usersRouter = express.Router();

usersRouter.get('/', httpGetUsers);

module.exports = usersRouter;
