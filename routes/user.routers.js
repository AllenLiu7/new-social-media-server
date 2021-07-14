const express = require('express');
const {
  httpGetUser,
  httpFollowUser,
  httpUnfollowUser,
} = require('../controllers/users.controller.js');

const userRouter = express.Router();

userRouter.get('/:id', httpGetUser);
userRouter.put('/:id/follow', httpFollowUser);
userRouter.put('/:id/unfollow', httpUnfollowUser);

module.exports = userRouter;
