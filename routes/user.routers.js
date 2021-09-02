const express = require('express');
const { verifyAccessToken } = require('../services/jwt');
const {
  httpGetCurrentUser,
  httpGetUser,
  httpFollowUser,
  httpUnfollowUser,
  httpGetFollowings,
  httpUpdateCurrentUser,
  httpGetUnfollowUser,
} = require('../controllers/users.controller.js');

const userRouter = express.Router();

userRouter.get('/', httpGetUser);
userRouter.get('/:id', httpGetCurrentUser);
userRouter.get('/:id/followings', httpGetFollowings);
userRouter.get('/:id/recommand_users', httpGetUnfollowUser);
userRouter.put('/:id/follow', httpFollowUser);
userRouter.put('/:id/unfollow', httpUnfollowUser);
userRouter.put('/edit_profile', verifyAccessToken, httpUpdateCurrentUser);

module.exports = userRouter;
