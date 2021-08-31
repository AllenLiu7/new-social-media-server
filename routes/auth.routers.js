const express = require('express');
const authRouter = express.Router();
const {
  httpRegisterUser,
  httpLoginUser,
  httpCheckUsername,
  httpCheckEmail,
  httpRefreshToken,
  httpClearToken,
} = require('../controllers/auth.controller');
const { verifyRefreshToken } = require('../services/jwt');

//register user
authRouter.post('/register', httpRegisterUser);
authRouter.post('/login', httpLoginUser);
authRouter.post('/checkname', httpCheckUsername);
authRouter.post('/checkemail', httpCheckEmail);
authRouter.post('/refresh-token', verifyRefreshToken, httpRefreshToken);
authRouter.post('/logout', verifyRefreshToken, httpClearToken);

//lagout user

module.exports = authRouter;
