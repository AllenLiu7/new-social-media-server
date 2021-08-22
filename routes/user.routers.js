const express = require('express');
const {
  httpGetCurrentUser,
  httpGetUser,
  httpFollowUser,
  httpUnfollowUser,
  httpGetFollowings,
  httpUpdateCurrentUser,
} = require('../controllers/users.controller.js');

const userRouter = express.Router();

userRouter.get('/', httpGetUser);
userRouter.get('/:id', httpGetCurrentUser);
userRouter.get('/:id/followings', httpGetFollowings);
userRouter.put('/:id/follow', httpFollowUser);
userRouter.put('/:id/unfollow', httpUnfollowUser);
userRouter.put('/edit_profile', httpUpdateCurrentUser);

module.exports = userRouter;
