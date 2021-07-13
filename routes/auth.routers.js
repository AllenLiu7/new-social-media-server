const express = require('express');
const authRouter = express.Router();
const {
  httpRegisterUser,
  httpLoginUser,
} = require('../controllers/auth.controller');

//register user
authRouter.post('/register', httpRegisterUser);
authRouter.get('/login', httpLoginUser);

//login user

//lagout user

module.exports = authRouter;
