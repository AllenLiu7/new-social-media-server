const express = require('express');
const authRouter = express.Router();
const { httpRegisterUser } = require('../controllers/auth.controller');

//register user
authRouter.post('/register', httpRegisterUser);

//login user

//lagout user

module.exports = authRouter;
