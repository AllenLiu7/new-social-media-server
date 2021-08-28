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

//register user
authRouter.post('/register', httpRegisterUser);
authRouter.post('/login', httpLoginUser);
authRouter.post('refresh');
authRouter.post('/checkname', httpCheckUsername);
authRouter.post('/checkemail', httpCheckEmail);
authRouter.post('/refresh-token', httpRefreshToken);
authRouter.post('/logout', httpClearToken);

//lagout user

module.exports = authRouter;
