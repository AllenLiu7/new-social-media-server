const express = require('express');
const { httpGetUser } = require('../controllers/users.controller.js');

const userRouter = express.Router();

userRouter.get('/:userid', httpGetUser);

module.exports = userRouter;
