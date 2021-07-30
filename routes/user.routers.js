const express = require('express');
const {
  httpGetUser,
  httpFollowUser,
  httpUnfollowUser,
  httpGetFollowings,
} = require('../controllers/users.controller.js');

const userRouter = express.Router();

userRouter.get('/:id', httpGetUser);
userRouter.get('/:id/followings', httpGetFollowings);
userRouter.put('/:id/follow', httpFollowUser);
userRouter.put('/:id/unfollow', httpUnfollowUser);

module.exports = userRouter;
