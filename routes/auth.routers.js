const express = require('express');
const authRouter = express.Router();
const {
  httpRegisterUser,
  httpLoginUser,
  httpCheckUsername,
  httpCheckEmail,
} = require('../controllers/auth.controller');

//register user
authRouter.post('/register', httpRegisterUser);
authRouter.post('/login', httpLoginUser);
authRouter.post('/checkname', httpCheckUsername);
authRouter.post('/checkemail', httpCheckEmail);
//login user

//lagout user

module.exports = authRouter;
